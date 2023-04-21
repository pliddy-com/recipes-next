/* istanbul ignore file */

import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import userPool from './userPool';

const APP_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID;
const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
// const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;

interface signInProps {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: signInProps) => {
  if (!(email && password && APP_CLIENT_ID && USER_POOL_ID))
    throw new Error('Must provide email and password to sign in');
  try {
    // const poolData = {
    //   UserPoolId: USER_POOL_ID,
    //   ClientId: APP_CLIENT_ID
    // };

    // const userPool = new CognitoUserPool(poolData);

    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const res = user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('login success', result);
      },
      onFailure: (err) => {
        console.log('login failure', err);
      },
      newPasswordRequired: (data) => {
        console.log('new password required', data);
      }
    });

    console.log({ res });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
