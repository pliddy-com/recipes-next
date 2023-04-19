#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import {
  App,
  Duration,
  Fn,
  RemovalPolicy,
  Stack,
  StackProps
} from 'aws-cdk-lib';

import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager';

import {
  AllowedMethods,
  Distribution,
  DistributionProps,
  EdgeLambda,
  ErrorResponse,
  HttpVersion,
  IDistribution,
  LambdaEdgeEventType,
  OriginAccessIdentity,
  OriginRequestPolicy,
  PriceClass,
  ResponseHeadersPolicy,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy
} from 'aws-cdk-lib/aws-cloudfront';

import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

import {
  UserPool,
  UserPoolDomain,
  UserPoolDomainProps,
  UserPoolEmail
} from 'aws-cdk-lib/aws-cognito';

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

import {
  ARecord,
  HostedZone,
  IHostedZone,
  RecordTarget
} from 'aws-cdk-lib/aws-route53';

import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';

/**
 *  Identify the Route 53 hosted zone for the domain
 *
 *  Generate a CloudFormation output value for the siteUrl for the current branch
 */

export interface getHostedZoneProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  domain: string;
  siteDomain: string;
  stack: RecipesBranchStack;
}

const getHostedZone = ({
  branch,
  branchLabel,
  branchSubdomain,
  domain,
  siteDomain,
  stack
}: getHostedZoneProps) => {
  const hostedZone = HostedZone.fromLookup(stack, 'Zone', {
    domainName: domain
  });

  stack.exportValue(
    `https://${branch === 'main' ? branchSubdomain : siteDomain}`,
    { name: `Recipes-SiteUrl-${branchLabel}` }
  );

  return hostedZone;
};

/**
 *  Create an origin request handler lambda@edge function version
 *
 *  Generate a CloudFormation output value for the origin request function
 */

export interface CreateEdgeLambdaProps {
  stack: RecipesBranchStack;
}

export const createEdgeLambda = ({ stack }: CreateEdgeLambdaProps) => {
  const originRequestHandler = new NodejsFunction(stack, 'originRequest');
  originRequestHandler.applyRemovalPolicy(RemovalPolicy.RETAIN);

  const edgeLambda: EdgeLambda = {
    eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
    functionVersion: originRequestHandler.currentVersion
  };

  return edgeLambda;
};

/**
 *  Create a CloudFront Web Distribution
 *
 *  This solution is using Origin Access Identity (OAI) with Distribution
 *  to address AWS CDK internal conflicts between Origin Access Control (OAC)
 *  and OAI when trying to use OAC.
 *
 *  Generates a CloudFormation output value for the CloudFront distribution id
 */

export interface createDistributionProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  certificate: ICertificate;
  edgeLambda: EdgeLambda;
  resourceLabel: string;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createDistribution = ({
  branch,
  branchLabel,
  branchSubdomain,
  certificate,
  edgeLambda,
  resourceLabel,
  siteDomain,
  stack
}: createDistributionProps) => {
  // S3 path for serving branch files
  const originPath = `/branches/${branch}`;

  const cloudfrontOAIId = Fn.importValue(`Recipes-OAI-${resourceLabel}`);

  const cloudfrontOAI = OriginAccessIdentity.fromOriginAccessIdentityId(
    stack,
    'DomainOAI',
    cloudfrontOAIId
  );

  const responseHeadersPolicyId = Fn.importValue(
    `Recipes-ResponseHeadersPolicy-${resourceLabel}`
  );

  const responseHeadersPolicy =
    ResponseHeadersPolicy.fromResponseHeadersPolicyId(
      stack,
      'ResponseHeadersPolicy',
      responseHeadersPolicyId
    );

  const siteBucketArn = Fn.importValue(`Recipes-BucketArn-${resourceLabel}`);
  const siteBucket = Bucket.fromBucketArn(stack, 'DomainBucket', siteBucketArn);

  const customErrorResponse400: ErrorResponse = {
    httpStatus: 400,
    ttl: Duration.minutes(10),
    responseHttpStatus: 404,
    responsePagePath: '/404.html'
  };

  const customErrorResponse403: ErrorResponse = {
    httpStatus: 403,
    ttl: Duration.minutes(10),
    responseHttpStatus: 404,
    responsePagePath: '/404.html'
  };

  const customErrorResponse404: ErrorResponse = {
    httpStatus: 404,
    ttl: Duration.minutes(10),
    responseHttpStatus: 404,
    responsePagePath: '/404.html'
  };

  const distributionConfig: DistributionProps = {
    certificate,
    defaultBehavior: {
      allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      compress: true,
      edgeLambdas: [edgeLambda],
      origin: new S3Origin(siteBucket, {
        originAccessIdentity: cloudfrontOAI,
        originPath
        // originShieldEnabled: true,
        // originShieldRegion: process.env.CDK_DEFAULT_REGION
      }),
      originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
      responseHeadersPolicy,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
    },
    defaultRootObject: 'index.html',
    domainNames: [branch === 'main' ? branchSubdomain : siteDomain],
    errorResponses: [
      customErrorResponse400,
      customErrorResponse403,
      customErrorResponse404
    ],
    httpVersion: HttpVersion.HTTP2_AND_3,
    minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
    priceClass: PriceClass.PRICE_CLASS_100
  };

  const distribution = new Distribution(
    stack,
    'SiteDistribution',
    distributionConfig
  );

  stack.exportValue(distribution.distributionId, {
    name: `Recipes-Distribution-${branchLabel}`
  });

  return distribution;
};

/**
 *  Create a Cognito User Pool
 *
 *  Generates a CloudFormation output value for the user pool ARN
 */

export interface CreateUserPoolProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  certificate: ICertificate;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createUserPool = ({
  branch,
  branchLabel,
  branchSubdomain,
  certificate,
  siteDomain,
  stack
}: CreateUserPoolProps) => {
  const userPool = new UserPool(stack, 'UserPool', {
    autoVerify: { email: true },
    deletionProtection: branch == 'main',
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
    userPoolName: `RecipesUserPool${branchLabel}`,
    userInvitation: {
      emailSubject: 'Recipes invitation',
      emailBody: 'Your username is {username} and temporary password is {####}.'
    }
  });

  userPool.addDomain('CustomDomain', {
    customDomain: {
      domainName: `auth.${branch === 'main' ? branchSubdomain : siteDomain}`,
      certificate
    }
  });

  const userPoolOptions = {
    authFlows: {
      userPassword: true,
      userSrp: true
    },
    userPoolClientName: `RecipesClient${branch === 'main' ? 'Prod' : 'Dev'}`
  };

  userPool.addClient('UserPoolClient', userPoolOptions);

  stack.exportValue(userPool.userPoolArn, {
    name: `Recipes-UserPool-${branch === 'main' ? 'Prod' : 'Dev'}`
  });
};

/**
 *  Create a Route53 alias record for the CloudFront distribution
 *
 *  Generates a CloudFormation output value for the Site Alias Record
 */

export interface CreateAliasRecordProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  distribution: IDistribution;
  hostedZone: IHostedZone;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createAliasRecord = ({
  branch,
  branchLabel,
  branchSubdomain,
  distribution,
  hostedZone,
  siteDomain,
  stack
}: CreateAliasRecordProps) => {
  const recordName = branch === 'main' ? branchSubdomain : siteDomain;

  const record = new ARecord(stack, `BranchAliasRecord`, {
    recordName,
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone
  });

  stack.exportValue(recordName, {
    name: `Recipes-SubdomainAliasRecord-${branchLabel}`
  });

  return record;
};

/**
 *  Generate a CloudFormation Stack to deploy site infrastructure:
 *    - CloudFront distribution
 *    - Route 53 DNS records for {branch}.recipes.pliddy.com
 */

export interface RecipesBranchStackProps extends StackProps {
  domain: string;
  subdomain: string;
  branch: string;
}

export class RecipesBranchStack extends Stack {
  constructor(scope: App, id: string, props: RecipesBranchStackProps) {
    super(scope, id, props);

    const { domain, subdomain, branch, env } = props;
    const { account, region } = env ?? {};

    if (!account || !region)
      throw 'Missing environment variable for account and region';

    const resourceLabel = branch === 'main' ? 'Prod' : 'Dev';

    /**
     *  Create strings based on branch, subdomain, and domain for use by the stack
     */

    // capitalize first letter for PascalCase
    const branchLabel = branch && branch[0].toUpperCase() + branch.slice(1);

    // subdomain used for recipes.pliddy.com
    const branchSubdomain = `${subdomain}.${domain}`;

    // full domain for feature branch: branch.recipes.pliddy.com
    const siteDomain = `${branch}.${branchSubdomain}`;

    const certificateArn = Fn.importValue(
      `Recipes-Certificate-${resourceLabel}`
    );

    const certificate = Certificate.fromCertificateArn(
      this,
      'DomainCertificate',
      certificateArn
    );

    /**
     *  get Route 53 hosted zone for the domain
     */

    const hostedZone = getHostedZone({
      branch,
      branchLabel,
      branchSubdomain,
      domain,
      siteDomain,
      stack: this
    });

    /**
     *  Create an origin request handler lambda@edge function version
     */

    const edgeLambda = createEdgeLambda({ stack: this });

    /**
     *  Create a CloudFront Web Distribution
     */

    const distribution = createDistribution({
      branch,
      branchLabel,
      branchSubdomain,
      certificate,
      edgeLambda,
      resourceLabel,
      siteDomain,
      stack: this
    });

    /**
     *  Create a Cognito User Pool
     */

    createUserPool({
      branch,
      branchLabel,
      branchSubdomain,
      certificate,
      siteDomain,
      stack: this
    });

    /**
     *  Create a Route53 alias record for the CloudFront distribution
     */

    createAliasRecord({
      branch,
      branchLabel,
      branchSubdomain,
      distribution,
      hostedZone,
      siteDomain,
      stack: this
    });
  }
}
