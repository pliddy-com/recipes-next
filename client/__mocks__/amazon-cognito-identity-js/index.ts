import cognitoUserPool from './CognitoUserPool';
import cognitoUser from './CognitoUser';
import authDetails from './AuthenticationDetails';

module.exports = {
  AuthenticationDetails: jest.fn().mockImplementation(authDetails),
  CognitoUser: jest.fn().mockImplementation(cognitoUser),
  CognitoUserPool: jest.fn().mockImplementation(cognitoUserPool)
};
