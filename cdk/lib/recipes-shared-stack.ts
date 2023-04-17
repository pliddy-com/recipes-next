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
import {
  UserPool,
  UserPoolEmail,
  VerificationEmailStyle
} from 'aws-cdk-lib/aws-cognito';

import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { HostedZone } from 'aws-cdk-lib/aws-route53';

import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  ObjectOwnership
} from 'aws-cdk-lib/aws-s3';

/**
 *  Create an Origin Access Identity to allow the CloudFront distribution to access the S3 bucket
 *
 *  Generates a CloudFormation output value for the OAI
 */

export interface createCloudFrontOAIProps {
  stack: RecipesSharedStack;
  id: string;
  resourceLabel: string;
}

export const createCloudFrontOAI = ({
  stack,
  id,
  resourceLabel
}: createCloudFrontOAIProps) => {
  const cloudfrontOAI = new OriginAccessIdentity(stack, 'cloudfront-OAI', {
    comment: `OAI for ${id}`
  });

  stack.exportValue(cloudfrontOAI.originAccessIdentityId, {
    name: `Recipes-OAI-${resourceLabel}`
  });

  return cloudfrontOAI;
};

/**
 *  Creates a custom Response Headers Policy for cache settings.
 *
 *  Generates a CloudFormation output value for the ResponseHeadersPolicy
 */

export interface CreateResponseHeaderPolicyProps {
  stack: RecipesSharedStack;
  resourceLabel: string;
}

export const createResponseHeaderPolicy = ({
  stack,
  resourceLabel
}: CreateResponseHeaderPolicyProps) => {
  const responseHeadersPolicy = new ResponseHeadersPolicy(
    stack,
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

  stack.exportValue(responseHeadersPolicy.responseHeadersPolicyId, {
    name: `Recipes-ResponseHeadersPolicy-${resourceLabel}`
  });
};

/**
 *  Create an S3 bucket
 *
 *  All branches will use the same bucket with individual /branches/{branch} subdirectories
 *  to host files for hosting the main branch and testing feature branches, so the stack
 *  checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
 *
 *  Generates a CloudFormation output value for the bucket name and ARN if it creates a bucket
 */

export interface CreateSiteBucketProps {
  branch: string;
  branchSubdomain: string;
  cloudfrontOAI: OriginAccessIdentity;
  resourceLabel: string;
  stack: RecipesSharedStack;
}

export const createSiteBucket = ({
  branch,
  branchSubdomain,
  cloudfrontOAI,
  resourceLabel,
  stack
}: CreateSiteBucketProps) => {
  // add Main or Dev label based on branch
  const bucketLabel = branch === 'main' ? 'prod' : 'dev';
  const bucketName = `${branchSubdomain}-${bucketLabel}`;

  const siteBucket = new Bucket(stack, 'DomainBucket', {
    accessControl: BucketAccessControl.PRIVATE,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    bucketName,
    objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
    publicReadAccess: false
  });

  // Attach the CloudFront access policy to the S3 bucket
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

  stack.exportValue(siteBucket.bucketArn, {
    name: `Recipes-BucketArn-${resourceLabel}`
  });
  stack.exportValue(siteBucket.bucketName, {
    name: `Recipes-BucketName-${resourceLabel}`
  });

  return siteBucket;
};

/**
 *  Create a TLS certificate for use on all feature branch subdomains domains under *.recipes.pliddy.com
 *  Include recipes.pliddy.com and www.pliddy.com for general use across the domain (for now)
 *
 *  The stack checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
 *
 *  Generate a CloudFormation output value for the certificate ARN if it creates a certificate
 */

export interface CreateCertificateProps {
  branch: string;
  branchSubdomain: string;
  domain: string;
  stack: RecipesSharedStack;
}

export const createCertificate = ({
  branch,
  branchSubdomain,
  domain,
  stack
}: CreateCertificateProps) => {
  // Identify the Route 53 hosted zone for the domain
  const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: domain
  });

  const certDomain = `*.${branchSubdomain}`;

  const certificate = new Certificate(stack, 'DomainCertificate', {
    domainName: branch === 'main' ? branchSubdomain : certDomain,
    validation: CertificateValidation.fromDns(hostedZone)
  });

  stack.exportValue(certificate.certificateArn, {
    name: `Recipes-Certificate-${branch === 'main' ? 'Prod' : 'Dev'}`
  });
};

/**
 *  Create a Cognito User Pool
 *
 *  Generates a CloudFormation output value for the user pool ARN
 */

export interface CreateUserPoolProps {
  branch: string;
  resourceLabel: string;
  stack: RecipesSharedStack;
}

export const createUserPool = ({
  branch,
  resourceLabel,
  stack
}: CreateUserPoolProps) => {
  const userPool = new UserPool(stack, 'UserPool', {
    autoVerify: { email: true },
    deletionProtection: true,
    email: UserPoolEmail.withSES({
      fromEmail: 'pjliddy@gmail.com',
      fromName: 'Recipes',
      replyTo: 'pjliddy@gmail.com'
    }),
    keepOriginal: {
      email: true
    },
    passwordPolicy: {
      minLength: 8,
      requireLowercase: true,
      requireUppercase: true,
      requireDigits: true,
      requireSymbols: true,
      tempPasswordValidity: Duration.days(3)
    },
    signInAliases: { email: true },
    signInCaseSensitive: false, // case insensitive is preferred in most situations
    standardAttributes: {
      email: {
        required: true,
        mutable: false
      },
      familyName: {
        required: true,
        mutable: false
      },
      givenName: {
        required: true,
        mutable: false
      },
      phoneNumber: {
        required: true,
        mutable: false
      }
    },
    userPoolName: `RecipesUserPool${resourceLabel}`,
    userVerification: {
      emailSubject: 'Recipes verification link',
      emailBody:
        'Please click the link below to verify your email address. {##Verify Email##}',
      emailStyle: VerificationEmailStyle.LINK
    }
  });

  stack.exportValue(userPool.userPoolArn, {
    name: `Recipes-UserPool-${branch === 'main' ? 'Prod' : 'Dev'}`
  });
};

/**
 *  Generate a CloudFormation Stack to deploy site infrastructure:
 *    - S3 bucket to store static files
 *    - ACM Certificate for SSL for all *.recipes.pliddy.com
 *    - Origin Access Control (OAC) for managing permissions for CloudFront access to S3
 */

export interface RecipesSharedStackProps extends StackProps {
  domain: string;
  subdomain: string;
  branch: string;
}

export class RecipesSharedStack extends Stack {
  constructor(scope: App, id: string, props: RecipesSharedStackProps) {
    super(scope, id, props);

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
    const resourceLabel = branch === 'main' ? 'Prod' : 'Dev';

    /**
     *  Create an Origin Access Identity
     */

    const cloudfrontOAI = createCloudFrontOAI({
      id,
      resourceLabel,
      stack: this
    });

    /**
     *  Create a custom Response Headers Policy
     */

    createResponseHeaderPolicy({
      resourceLabel,
      stack: this
    });

    /**
     *  Create an S3 bucket
     */

    createSiteBucket({
      branch,
      branchSubdomain,
      cloudfrontOAI,
      resourceLabel,
      stack: this
    });

    /**
     *  Create a TLS certificate
     */

    createCertificate({
      branch,
      branchSubdomain,
      domain,
      stack: this
    });

    /**
     *  Create a Cognito User Pool
     */

    createUserPool({ branch, resourceLabel, stack: this });
  }
}
