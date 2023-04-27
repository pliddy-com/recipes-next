const session = {
  getIdToken: jest.fn().mockReturnValue({
    getJwtToken: jest.fn().mockReturnValue('TOKEN')
  })
};

const authenticateUser = jest
  .fn()
  .mockImplementation((_authDetails, callbacks) => {
    callbacks['onSuccess'](session);
    callbacks['onFailure'](new Error('AUTHENTICATE USER ERRORa'));
  });

const CognitoUser = () => ({
  authenticateUser
});

export default CognitoUser;
