export interface ICognitoUserPoolData {
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
    .mockImplementation((callback) => callback(null, session)),
  // .mockImplementationOnce((callback) =>
  //   callback(new Error('SESSION_ERROR'), null)
  // ),
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
