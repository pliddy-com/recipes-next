import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { OAuthScope, UserPool, UserPoolEmail } from 'aws-cdk-lib/aws-cognito';

import { ARecord, IHostedZone } from 'aws-cdk-lib/aws-route53';

import { RecipesBranchStack } from '../../recipes-branch-stack';

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
  hostedZone: IHostedZone;
  resourceLabel: string;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createUserPool = ({
  branch,
  branchLabel,
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
      }
    },
    userPoolName: `RecipesUserPool${branchLabel}`,
    userInvitation: {
      emailSubject: 'Recipes invitation',
      emailBody: 'Your username is {username} and temporary password is {####}.'
    }
  });

  const userPoolClient = userPool.addClient('UserPoolClient', {
    authFlows: {
      userPassword: true,
      userSrp: true
    },
    oAuth: {
      flows: {
        authorizationCodeGrant: true
      },
      scopes: [OAuthScope.EMAIL, OAuthScope.OPENID]
    },
    userPoolClientName: `RecipesUserPoolClient${branchLabel}`
  });

  // Add dependency
  userPoolClient.node.addDependency(userPool);

  stack.exportValue(userPool.userPoolId, {
    name: `Recipes-UserPool-${branchLabel}`
  });

  stack.exportValue(userPoolClient.userPoolClientId, {
    name: `Recipes-UserPoolClient-${branchLabel}`
  });

  return userPool;
};
