import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import {
  OAuthScope,
  UserPool,
  UserPoolDomain,
  UserPoolEmail
} from 'aws-cdk-lib/aws-cognito';

import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { UserPoolDomainTarget } from 'aws-cdk-lib/aws-route53-targets';

import { RecipesBranchStack } from '../../recipes-branch-stack';

import { createAuthCertificate } from './authCertificate';

/**
 *  Create a Cognito User Pool
 *
 *  Generates a CloudFormation output value for the user pool ARN
 */

export interface CreateUserPoolProps {
  aliasRecord: ARecord;
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  domain: string;
  hostedZone: IHostedZone;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createUserPool = ({
  aliasRecord,
  branch,
  branchLabel,
  branchSubdomain,
  domain,
  hostedZone,
  siteDomain,
  stack
}: CreateUserPoolProps) => {
  const userPool = new UserPool(stack, 'UserPool', {
    autoVerify: { email: true },
    deletionProtection: branch === 'main',
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
    removalPolicy:
      branch === 'main' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    signInAliases: { email: true },
    signInCaseSensitive: false, // case insensitive is preferred in most situations
    standardAttributes: {
      email: {
        required: true,
        mutable: true
      },
      familyName: {
        required: true,
        mutable: true
      },
      givenName: {
        required: true,
        mutable: true
      },
      phoneNumber: {
        required: true,
        mutable: true
      }
    },
    userPoolName: `RecipesUserPool${branchLabel}`,
    userInvitation: {
      emailSubject: 'Recipes invitation',
      emailBody: 'Your username is {username} and temporary password is {####}.'
    }
  });

  const authDomainName = `auth.${
    branch === 'main' ? branchSubdomain : siteDomain
  }`;

  const authCertificate = createAuthCertificate({
    authDomainName,
    branch,
    branchLabel,
    branchSubdomain,
    domain,
    stack
  });

  const userPoolDomain = new UserPoolDomain(stack, 'UserPoolDomain', {
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
  const authAliasRecord = new ARecord(stack, 'UserPoolAuthAliasRecord', {
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

  stack.exportValue(userPool.userPoolArn, {
    name: `Recipes-UserPool-${branchLabel}`
  });

  return userPool;
};
