import { CognitoUserPool } from 'amazon-cognito-identity-js';

const APP_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID;
const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;

const poolData = APP_CLIENT_ID &&
  USER_POOL_ID && {
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  };

const userPool =
  APP_CLIENT_ID && USER_POOL_ID && poolData && new CognitoUserPool(poolData);

export default userPool;
