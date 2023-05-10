import * as contentful from 'contentful-management';
import { getClient } from './contentful';

jest.mock('contentful-management', () => ({
  ...jest.requireActual('contentful-management'),
  createClient: jest.fn().mockImplementation(() => ({
    getEnvironment: jest.fn().mockImplementation(() => ({
      getSpace: jest.fn().mockImplementation(() => ({
        getEntry: jest.fn().mockImplementation(() => ({
          name: 'value'
        }))
      }))
    }))
  }))
}));

describe('in contentful.ts', () => {
  describe('when getClient() is called', () => {
    it('it returns a client object', () => {
      const clientSpy = jest.spyOn(contentful, 'createClient');

      const client = getClient();

      expect(client).toBeDefined();
      expect(clientSpy).toBeCalled();
    });
  });
});
