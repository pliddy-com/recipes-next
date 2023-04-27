jest.createMockFromModule('amazon-cognito-identity-js');

const session = {
  getIdToken: jest.fn().mockReturnValue({
    getJwtToken: jest.fn().mockReturnValue('TOKEN')
  })
};

const authenticateUser = jest
  .fn()
  .mockImplementation((_authDetails, callbacks) => {
    callbacks['onSuccess'](session);
    // TODO: update mock with second callback as separate test
    // callbacks['onFailure'](new Error('AUTHENTICATE USER ERRORa'));
  });

const CognitoUser = () => ({
  authenticateUser
});

export default CognitoUser;
