import { Fn, Duration } from 'aws-cdk-lib';
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  EdgeLambda,
  OriginAccessIdentity,
  ResponseHeadersPolicy,
  ErrorResponse,
  DistributionProps,
  AllowedMethods,
  OriginRequestPolicy,
  ViewerProtocolPolicy,
  HttpVersion,
  SecurityPolicyProtocol,
  PriceClass,
  Distribution
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { RecipesBranchStack } from '../../recipes-branch-stack';

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
  edgeLambda: EdgeLambda;
  resourceLabel: string;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createDistribution = ({
  branch,
  branchLabel,
  branchSubdomain,
  edgeLambda,
  resourceLabel,
  siteDomain,
  stack
}: createDistributionProps) => {
  // S3 path for serving branch files
  const originPath = `/branches/${branch}`;

  const certificateArn = Fn.importValue(`Recipes-Certificate-${resourceLabel}`);
  const certificate = Certificate.fromCertificateArn(
    stack,
    'DomainCertificate',
    certificateArn
  );

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
