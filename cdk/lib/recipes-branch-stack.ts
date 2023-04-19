#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import { App, Stack, StackProps } from 'aws-cdk-lib';

import { createAliasRecord } from './resources/branch/aliasRecord';
import { createDistribution } from './resources/branch/distribution';
import { createEdgeLambda } from './resources/branch/edgeLambda';
import { createUserPool } from './resources/branch/userPool';
import { getHostedZone } from './resources/branch/hostedZone';

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

    /**
     *  Create strings based on branch, subdomain, and domain for use by the stack
     */

    const resourceLabel = branch === 'main' ? 'Prod' : 'Dev';

    // capitalize first letter for PascalCase
    const branchLabel = branch && branch[0].toUpperCase() + branch.slice(1);

    // subdomain used for recipes.pliddy.com
    const branchSubdomain = `${subdomain}.${domain}`;

    // full domain for feature branch: branch.recipes.pliddy.com
    const siteDomain = `${branch}.${branchSubdomain}`;

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
      edgeLambda,
      resourceLabel,
      siteDomain,
      stack: this
    });

    /**
     *  Create a Route53 alias record for the CloudFront distribution
     */

    const aliasRecord = createAliasRecord({
      branch,
      branchLabel,
      branchSubdomain,
      distribution,
      hostedZone,
      siteDomain,
      stack: this
    });

    /**
     *  Create a Cognito User Pool
     */

    const userPool = createUserPool({
      aliasRecord,
      branch,
      branchLabel,
      branchSubdomain,
      domain,
      hostedZone,
      resourceLabel,
      siteDomain,
      stack: this
    });
  }
}
