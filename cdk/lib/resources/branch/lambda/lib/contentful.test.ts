import * as contentful from 'contentful-management';

import client from './contentful';

jest.mock('contentful-management', () => ({
  // ...jest.requireActual('contentful-management'),
  createClient: jest.fn().mockImplementation(() => ({
    getSpace: jest.fn().mockImplementation(() => ({
      getEnvironment: jest.fn().mockImplementation(() => ({
        getEntry: jest.fn().mockImplementation(() => ({
          name: 'value'
        }))
      }))
    }))
  }))
}));

describe('in contentful.ts', () => {
  it('client is defined', () => {
    const contentfulSpy = jest.spyOn(contentful, 'createClient');
    expect(client).toBeDefined();
    expect(contentfulSpy).toHaveBeenCalled();
  });
});
