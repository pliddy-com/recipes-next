#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import { App, Duration, Fn, Stack, StackProps } from 'aws-cdk-lib';

import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

import {
  AllowedMethods,
  Distribution,
  DistributionProps,
  ErrorResponse,
  experimental,
  HttpVersion,
  LambdaEdgeEventType,
  OriginAccessIdentity,
  OriginRequestPolicy,
  PriceClass,
  ResponseHeadersPolicy,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';

import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import path from 'path';

/**
 *  define the TypeScript interface for the stack
 */

export interface RecipesBranchStackProps extends StackProps {
  domain: string;
  subdomain: string;
  branch: string;
}

/**
 *  Generate a CloudFormation Stack to deploy site infrastructure:
 *    - CloudFront distribution
 *    - Route 53 DNS records for {branch}.recipes.pliddy.com
 */

export class RecipesBranchStack extends Stack {
  constructor(scope: App, id: string, props: RecipesBranchStackProps) {
    super(scope, id, props);

    /*
     *  Desctructure props
     */

    const { domain, subdomain, branch, env } = props;
    const { account, region } = env ?? {};

    if (!account || !region)
      throw 'Missing environment variable for account and region';

    /**
     *  import shared AWS resources
     */

    const siteBucketArn = Fn.importValue(
      `Recipes-BucketArn-${branch === 'main' ? 'Prod' : 'Dev'}`
    );
    const certificateArn = Fn.importValue(
      `Recipes-Certificate-${branch === 'main' ? 'Prod' : 'Dev'}`
    );
    const cloudfrontOAIId = Fn.importValue(
      `Recipes-OAI-${branch === 'main' ? 'Prod' : 'Dev'}`
    );
    const responseHeadersPolicyId = Fn.importValue(
      `Recipes-ResponseHeadersPolicy-${branch === 'main' ? 'Prod' : 'Dev'}`
    );

    const siteBucket = Bucket.fromBucketArn(
      this,
      'DomainBucket',
      siteBucketArn
    );
    const certificate = Certificate.fromCertificateArn(
      this,
      'DomainCertificate',
      certificateArn
    );
    const cloudfrontOAI = OriginAccessIdentity.fromOriginAccessIdentityId(
      this,
      'DomainOAI',
      cloudfrontOAIId
    );
    const responseHeadersPolicy =
      ResponseHeadersPolicy.fromResponseHeadersPolicyId(
        this,
        'ResponseHeadersPolicy',
        responseHeadersPolicyId
      );

    /**
     *  Create strings based on branch, subdomain, and domain for use by the stack
     */

    // capitalize first letter for PascalCase
    const branchLabel = branch && branch[0].toUpperCase() + branch.slice(1);

    // subdomain used for recipes.pliddy.com
    const branchSubdomain = `${subdomain}.${domain}`;

    // S3 path for serving branch files
    const originPath = `/branches/${branch}`;

    // full domain for feature branch: branch.recipes.pliddy.com
    const siteDomain = `${branch}.${branchSubdomain}`;

    /**
     *  Identify the Route 53 hosted zone for the domain
     *
     *  Generate a CloudFormation output value for the siteUrl for the current branch
     */

    const hostedZone = HostedZone.fromLookup(this, 'Zone', {
      domainName: domain,
    });

    this.exportValue(
      `https://${branch === 'main' ? branchSubdomain : siteDomain}`,
      { name: `Recipes-SiteUrl-${branchLabel}` }
    );

    /**
     *  Create custom error responses for the CloudFront distribution
     */

    const customErrorResponse400: ErrorResponse = {
      httpStatus: 400,
      ttl: Duration.minutes(10),
      responseHttpStatus: 400,
      responsePagePath: '/404.html',
    };

    const customErrorResponse403: ErrorResponse = {
      httpStatus: 403,
      ttl: Duration.minutes(10),
      responseHttpStatus: 403,
      responsePagePath: '/404.html',
    };

    const customErrorResponse404: ErrorResponse = {
      httpStatus: 404,
      ttl: Duration.minutes(10),
      responseHttpStatus: 404,
      responsePagePath: '/404.html',
    };

    /**
     *  Create an origin request handler lambda@edge function version
     *
     *  Generate a CloudFormation output value for the origin request function
     */

    const originRequestHandler = new Function(this, `OriginRequestHandler`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambda/originRequest')),
    });

    // const originRequestHandler = new experimental.EdgeFunction(
    //   this,
    //   `OriginRequestHandler`,
    //   {
    //     runtime: Runtime.NODEJS_16_X,
    //     handler: 'index.handler',
    //     code: Code.fromAsset('../cdk/lambda/originRequest'),
    //   }
    // );

    this.exportValue(originRequestHandler.functionArn, {
      name: `Recipes-OriginRequestHandlerArn-${branchLabel}`,
    });

    this.exportValue(originRequestHandler.currentVersion, {
      name: `Recipes-OriginRequestHandlerVersion-${branchLabel}`,
    });

    // this.exportValue(originRequestHandler.version, {
    //   name: `Recipes-OriginRequestHandlerVerion-${
    //     branch === 'main' ? 'Prod' : 'Dev'
    //   }`,
    // });

    /**
     *  Create a CloudFront Web Distribution
     *
     *  This solution is using Origin Access Identity (OAI) with Distribution
     *  to address AWS CDK internal conflicts between Origin Access Control (OAC)
     *  and OAI when trying to use OAC.
     *
     *  Generates a CloudFormation output value for the CloudFront distribution id
     */

    const distributionConfig: DistributionProps = {
      certificate,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        compress: false,
        edgeLambdas: [
          {
            functionVersion: originRequestHandler.currentVersion,
            eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
          },
        ],
        origin: new S3Origin(siteBucket, {
          originPath,
          originShieldEnabled: true,
          originShieldRegion: process.env.CDK_DEFAULT_REGION,
          originAccessIdentity: cloudfrontOAI,
        }),
        originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: [branch === 'main' ? branchSubdomain : siteDomain],
      errorResponses: [
        customErrorResponse400,
        customErrorResponse403,
        customErrorResponse404,
      ],
      httpVersion: HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: PriceClass.PRICE_CLASS_100,
    };

    const distribution = new Distribution(
      this,
      'SiteDistribution',
      distributionConfig
    );

    this.exportValue(distribution.distributionId, {
      name: `Recipes-Distribution-${branchLabel}`,
    });

    /**
     *  Create a Route53 alias record for the CloudFront distribution
     *
     *  Generates a CloudFormation output value for the Site Alias Record
     */

    const recordName = branch === 'main' ? branchSubdomain : siteDomain;

    new ARecord(this, `BranchAliasRecord`, {
      recordName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: hostedZone,
    });

    this.exportValue(recordName, {
      name: `Recipes-SubdomainAliasRecord-${branchLabel}`,
    });
  }
}
