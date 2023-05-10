import 'node-fetch';
import * as contentful from 'contentful-management';

import {
  callBuildWebhook,
  getEntry,
  getResponse,
  updateEntry
} from './entries';

const fields = {
  abstract: { 'en-US': 'abstract' },
  cookTime: { 'en-US': 30 },
  id: { 'en-US': 'ID' },
  prepTime: { 'en-US': 15 },
  recipeYield: { 'en-US': 4 },
  slug: { 'en-US': 'slug' },
  title: { 'en-US': 'title' }
};

jest.mock('node-fetch', () => jest.fn().mockResolvedValue({}));

jest.mock('contentful-management', () => ({
  ...jest.requireActual('contentful-management'),
  createClient: jest.fn().mockImplementation(() => ({
    getSpace: jest.fn().mockImplementation(() => ({
      getEnvironment: jest.fn().mockImplementation(() => ({
        getEntry: jest.fn().mockImplementation(() => ({
          fields,
          update: jest.fn().mockImplementation(() => ({
            fields,
            publish: jest.fn().mockImplementation(() => ({
              fields
            }))
          }))
        }))
      }))
    }))
  }))
}));

const env = process.env;

describe('in entries.ts', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env = {
      ...env,
      GH_WEBHOOK_URL: 'https://test.webhook.com'
    };
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when getResponse() is called', () => {
    it('it returns properly formatted response', () => {
      const statusCode = 200;
      const body = JSON.stringify({ name: 'value' });

      const expected = {
        statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body
      };

      const res = getResponse({ statusCode, body });

      expect(res).toEqual(expected);
    });
  });

  describe('when callBuildWebhook() is called', () => {
    it('it returns true on success', async () => {
      const result = await callBuildWebhook();
      expect(result).toEqual(true);
    });
  });

  describe('when getEntry() is called', () => {
    const entrySpy = jest.spyOn(contentful, 'createClient');

    it('it returns an entry from contentful', async () => {
      const expected = fields;

      const res = await getEntry({ id: 'ID' });

      expect(res.fields).toEqual(expected);
    });
  });

  describe('when updateEntry() is called', () => {
    it('it returns the updated recipe properties', async () => {
      const id = 'ID';
      const recipe = {
        abstract: 'abstract',
        cookTime: 30,
        id: 'ID',
        prepTime: 15,
        recipeYield: 4,
        slug: 'slug',
        title: 'title'
      };

      const res = await updateEntry({ id, recipe });

      expect(res).toEqual(recipe);
    });
  });
});
