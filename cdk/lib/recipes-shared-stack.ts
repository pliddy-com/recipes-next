#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import { App, Stack, StackProps } from 'aws-cdk-lib';

import { createCertificate } from './resources/shared/certificate';
import { createCloudFrontOAI } from './resources/shared/originAccessIdentity';
import { createResponseHeaderPolicy } from './resources/shared/responseHeaderPolicy';
import { createSiteBucket } from './resources/shared/s3Bucket';
import { HostedZone } from 'aws-cdk-lib/aws-route53';

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

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domain
    });

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
     *  Create a TLS certificate for Cloudfront distributions
     */

    createCertificate({
      branch,
      branchSubdomain,
      hostedZone,
      label: 'SiteCert',
      stack: this
    });
  }
}
