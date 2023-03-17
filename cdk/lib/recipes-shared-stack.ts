#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import { App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation
} from 'aws-cdk-lib/aws-certificatemanager';
import {
  HeadersFrameOption,
  HeadersReferrerPolicy,
  OriginAccessIdentity,
  ResponseHeadersPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  ObjectOwnership
} from 'aws-cdk-lib/aws-s3';

/**
 *  define the TypeScript interface for the stack
 */

export interface RecipesSharedStackProps extends StackProps {
  domain: string;
  subdomain: string;
  branch: string;
}

/**
 *  Generate a CloudFormation Stack to deploy site infrastructure:
 *    - S3 bucket to store static files
 *    - ACM Certificate for SSL for all *.recipes.pliddy.com
 *    - Origin Access Control (OAC) for managing permissions for CloudFront access to S3
 */

export class RecipesSharedStack extends Stack {
  constructor(scope: App, id: string, props: RecipesSharedStackProps) {
    super(scope, id, props);

    /*
     *  Desctructure props
     */

    const { domain, subdomain, env, branch } = props;
    const { account, region } = env ?? {};

    if (!account || !region)
      throw 'Missing environment variable for account and region';

    /**
     *  Create strings based on branch, subdomain, and domain for use by the stack
     */

    // subdomain used for recipes.pliddy.com
    const branchSubdomain = `${subdomain}.${domain}`;

    // add Main or Dev label based on branch
    const bucketLabel = branch === 'main' ? 'prod' : 'dev';
    const resourceLabel = branch === 'main' ? 'Prod' : 'Dev';

    // name of S3 bucket
    const bucketName = `${branchSubdomain}-${bucketLabel}`;

    // wildcard for all subdomains: *.recipes.pliddy.com
    const certDomain = `*.${branchSubdomain}`;

    /**
     *  Identify the Route 53 hosted zone for the domain
     */

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domain
    });

    /**
     *  Create an Origin Access Identity to allow the CloudFront distribution to access the S3 bucket
     *
     *  Generates a CloudFormation output value for the OAI
     */

    const cloudfrontOAI = new OriginAccessIdentity(this, 'cloudfront-OAI', {
      comment: `OAI for ${id}`
    });

    this.exportValue(cloudfrontOAI.originAccessIdentityId, {
      name: `Recipes-OAI-${resourceLabel}`
    });

    /**
     *  Creates a custom Response Headers Policy for cache settings.
     *
     *  Generates a CloudFormation output value for the ResponseHeadersPolicy
     */

    const responseHeadersPolicy = new ResponseHeadersPolicy(
      this,
      `ResponseHeadersPolicy${resourceLabel}`,
      {
        customHeadersBehavior: {
          customHeaders: [
            {
              header: 'cache-control',
              value: 'max-age=31536000',
              override: true
            }
          ]
        },
        responseHeadersPolicyName: `ResponseHeadersPolicy${resourceLabel}`,
        removeHeaders: ['server'],
        securityHeadersBehavior: {
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: HeadersFrameOption.DENY,
            override: true
          },
          referrerPolicy: {
            referrerPolicy: HeadersReferrerPolicy.NO_REFERRER,
            override: true
          },
          strictTransportSecurity: {
            accessControlMaxAge: Duration.seconds(31536000),
            includeSubdomains: true,
            override: false,
            preload: true
          },
          xssProtection: { protection: true, modeBlock: true, override: true }
        }
      }
    );

    this.exportValue(responseHeadersPolicy.responseHeadersPolicyId, {
      name: `Recipes-ResponseHeadersPolicy-${resourceLabel}`
    });

    /**
     *  Create an S3 bucket
     *
     *  All branches will use the same bucket with individual /branches/{branch} subdirectories
     *  to host files for hosting the main branch and testing feature branches, so the stack
     *  checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
     *
     *  Generates a CloudFormation output value for the bucket name and nARN if it creates a bucket
     */

    const siteBucket = new Bucket(this, 'DomainBucket', {
      accessControl: BucketAccessControl.PRIVATE,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      publicReadAccess: false
    });

    /**
     *  Attach the CloudFront access policy to the S3 bucket
     */

    siteBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [siteBucket.arnForObjects('*')],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          )
        ]
      })
    );

    this.exportValue(siteBucket.bucketArn, {
      name: `Recipes-BucketArn-${resourceLabel}`
    });
    this.exportValue(siteBucket.bucketName, {
      name: `Recipes-BucketName-${resourceLabel}`
    });

    /**
     *  Create a TLS certificate for use on all feature branch subdomains domains under *.recipes.pliddy.com
     *  Include recipes.pliddy.com and www.pliddy.com for general use across the domain (for now)
     *
     *  The stack checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
     *
     *  Generate a CloudFormation output value for the certificate ARN if it creates a certificate
     */

    const certificate = new Certificate(this, 'DomainCertificate', {
      domainName: branch === 'main' ? branchSubdomain : certDomain,
      validation: CertificateValidation.fromDns(hostedZone)
    });

    this.exportValue(certificate.certificateArn, {
      name: `Recipes-Certificate-${branch === 'main' ? 'Prod' : 'Dev'}`
    });
  }
}