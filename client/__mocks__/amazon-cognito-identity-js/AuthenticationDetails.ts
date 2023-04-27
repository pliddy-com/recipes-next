const AuthenticationDetails = () => ({
  getUserName: jest.fn().mockReturnValue('USER_NAME'),
  getPassword: jest.fn().mockReturnValue('PASSWORD'),
  getValidationData: jest.fn().mockReturnValue(['VALIDATION_DATA'])
});

export default AuthenticationDetails;
