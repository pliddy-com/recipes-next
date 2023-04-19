import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { UserPool, UserPoolEmail } from 'aws-cdk-lib/aws-cognito';
import { RecipesBranchStack } from '../../recipes-branch-stack';

/**
 *  Create a Cognito User Pool
 *
 *  Generates a CloudFormation output value for the user pool ARN
 */

export interface CreateUserPoolProps {
  branch: string;
  branchLabel: string;
  // branchSubdomain: string;
  // domain: string;
  // siteDomain: string;
  stack: RecipesBranchStack;
}

export const createUserPool = ({
  branch,
  branchLabel,
  // branchSubdomain,
  // domain,
  // siteDomain,
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

  // userPool.addDomain('CustomDomain', {
  //   customDomain: {
  //     domainName: `auth.${branch === 'main' ? branchSubdomain : siteDomain}`,
  //     certificate
  //   }
  // });

  // const userPoolOptions = {
  //   authFlows: {
  //     userPassword: true,
  //     userSrp: true
  //   },
  //   userPoolClientName: `RecipesClient${branch === 'main' ? 'Prod' : 'Dev'}`
  // };

  // userPool.addClient('UserPoolClient', userPoolOptions);

  stack.exportValue(userPool.userPoolArn, {
    name: `Recipes-UserPool-${branchLabel}`
  });

  return userPool;
};
