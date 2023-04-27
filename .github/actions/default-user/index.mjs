import core from '@actions/core';
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider';

const password = core.getInput('password');
const region = core.getInput('awsDefaultRegion');
const user = core.getInput('user');
const userPoolId = core.getInput('userPoolId');

try {
  const client = new CognitoIdentityProviderClient({ region });

  const userInput = {
    UserPoolId: userPoolId,
    Username: user
  };
  const createUserCommand = new AdminCreateUserCommand(userInput);
  await client.send(createUserCommand);

  const verifyEmailInput = {
    ...userInput,
    UserAttributes: [
      {
        Name: 'email_verified',
        Value: 'true'
      }
    ]
  };

  const setEmailVerified = new AdminUpdateUserAttributesCommand(
    verifyEmailInput
  );

  await client.send(setEmailVerified);

  const setPasswordIput = {
    ...userInput,
    Password: password,
    Permanent: true
  };

  const setPasswordCommand = new AdminSetUserPasswordCommand(setPasswordIput);
  await client.send(setPasswordCommand);

  console.log(`New Cognito user created for ${user}`);
} catch (err) {
  const errorType = err.name;

  switch (errorType) {
    case 'UsernameExistsException':
      console.log(`Cognito user ${user} already exists`);
      break;
    default:
      console.error(err);
  }
}
