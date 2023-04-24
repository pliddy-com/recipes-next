import '@testing-library/jest-dom';

import userPool from './userPool';

import * as Cognito from 'amazon-cognito-identity-js';

jest.mock('amazon-cognito-identity-js');

const env = process.env;

describe('userPool', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when there are config environment variables', () => {
    it('exports a Cognito user pool', () => {
      const cognitoSpy = jest
        .spyOn(Cognito, 'CognitoUserPool')
        .mockImplementation();

      const testUserPool = userPool;

      expect(testUserPool).toBeDefined();
      expect(cognitoSpy).toBeCalled();
    });
  });
});
