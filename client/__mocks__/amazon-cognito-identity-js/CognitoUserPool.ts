interface ICognitoUserPoolData {
  UserPoolId: string;
  ClientId: string;
}

const session = {
  getIdToken: jest.fn().mockReturnValue({
    getJwtToken: jest.fn().mockReturnValue('TOKEN')
  })
};

const user = {
  getSession: jest
    .fn()
    .mockImplementationOnce((cb) => cb(null, session))
    .mockImplementationOnce((cb) => cb(new Error('SESSION_ERROR'), null)),
  signOut: jest.fn()
};

export interface ICognitoUserPool {
  userPoolId: string;
  clientId: string;
  getCurrentUser(): typeof user;
}

const CognitoUserPool: (data: ICognitoUserPoolData) => ICognitoUserPool = (
  data: ICognitoUserPoolData
) => ({
  userPoolId: data.UserPoolId,
  clientId: data.ClientId,
  getCurrentUser: jest.fn().mockReturnValue(user)
});

export default CognitoUserPool;
