#!/usr/bin/env node

/**
 *  Import functions from aws-cdk-lib
 */

import { App, Fn, Stack, StackProps } from 'aws-cdk-lib';

import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { OAuthScope, UserPoolDomain } from 'aws-cdk-lib/aws-cognito';
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { UserPoolDomainTarget } from 'aws-cdk-lib/aws-route53-targets';

import { createAliasRecord } from './resources/branch/aliasRecord';
import { createAuthCertificate } from './resources/branch/authCertificate';
import { createDistribution } from './resources/branch/distribution';
import { createEdgeLambda } from './resources/branch/edgeLambda';
import { createUserPool } from './resources/branch/userPool';
import { getHostedZone } from './resources/branch/hostedZone';

/**
 *  Create a Route53 alias record for Cognito authentication
 *
 *  Generates a CloudFormation output value for the Site Alias Record
 */

// export interface CreateAuthAliasRecordProps {
//   branch: string;
//   branchLabel: string;
//   branchSubdomain: string;
//   userPoolDomain: UserPoolDomain;
//   hostedZone: IHostedZone;
//   siteDomain: string;
//   stack: RecipesBranchStack;
// }

// export const createAuthAliasRecord = ({
//   branch,
//   branchLabel,
//   branchSubdomain,
//   userPoolDomain,
//   hostedZone,
//   siteDomain,
//   stack
// }: CreateAuthAliasRecordProps) => {
//   const recordName = `auth.${branch === 'main' ? branchSubdomain : siteDomain}`;

//   const record = new ARecord(stack, `AuthAliasRecord`, {
//     recordName,
//     target: RecordTarget.fromAlias(new UserPoolDomainTarget(userPoolDomain)),

//     // target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
//     zone: hostedZone
//   });

//   stack.exportValue(recordName, {
//     name: `Recipes-AuthAliasRecord-${branchLabel}`
//   });

//   return record;
// };

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
      branch,
      branchLabel,
      stack: this
    });

    const authDomainName = `auth.${
      branch === 'main' ? branchSubdomain : siteDomain
    }`;

    console.log({ authDomainName });

    const authCertificate = createAuthCertificate({
      authDomainName,
      branch,
      branchLabel,
      branchSubdomain,
      domain,
      stack: this
    });

    const userPoolDomain = new UserPoolDomain(this, 'UserPoolDomain', {
      userPool,
      customDomain: {
        domainName: authDomainName,
        certificate: authCertificate
      }
    });

    // Add dependency
    userPoolDomain.node.addDependency(userPool);
    userPoolDomain.node.addDependency(authCertificate);
    userPoolDomain.node.addDependency(aliasRecord);

    // create alias record for {branch}.?auth.recipes.pliddy.com
    const authAliasRecord = new ARecord(this, 'UserPoolAuthAliasRecord', {
      zone: hostedZone,
      recordName: authDomainName,
      target: RecordTarget.fromAlias(new UserPoolDomainTarget(userPoolDomain))
    });

    // Add dependency
    authAliasRecord.node.addDependency(userPoolDomain);

    const userPoolClient = userPool.addClient('UserPoolClient', {
      authFlows: {
        userPassword: true,
        userSrp: true
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID],
        callbackUrls: [
          `https://${branch === 'main' ? branchSubdomain : siteDomain}`
        ],
        logoutUrls: [
          `https://${branch === 'main' ? branchSubdomain : siteDomain}/signin`
        ]
      },
      userPoolClientName: `RecipesClient${branchLabel}`
    });

    // Add dependency
    userPoolClient.node.addDependency(userPool);

    /**
     *  Create a Route53 alias record for the Cognito User Pool
     */

    // const authAliasRecord = createAuthAliasRecord({
    //   branch,
    //   branchLabel,
    //   branchSubdomain,
    //   userPoolDomain: userPool,
    //   hostedZone,
    //   siteDomain,
    //   stack: this
    // });

    // const authCertificate = createAuthCertificate({
    //   branch,
    //   branchLabel,
    //   branchSubdomain,
    //   domain,
    //   stack: this
    // });

    // userPool.addDomain('CustomDomain', {
    //   customDomain: {
    //     domainName: authAliasRecord.domainName,
    //     certificate: authCertificate
    //   }
    // });
  }
}
