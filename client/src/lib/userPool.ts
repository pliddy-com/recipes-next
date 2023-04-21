/* istanbul ignore file */

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const APP_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID;
const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

const poolData = {
  UserPoolId: USER_POOL_ID || '',
  ClientId: APP_CLIENT_ID || ''
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
