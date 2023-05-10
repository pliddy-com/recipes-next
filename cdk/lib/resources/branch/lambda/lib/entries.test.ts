import * as fetch from 'node-fetch';
import client from './contentful';

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
jest.mock('./contentful');

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
    jest.resetModules();
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

  describe('when callBuldHook() throws an error', () => {
    it('it handles the error', async () => {
      const mockFetch = Promise.reject({
        status: 400,
        json: jest.fn().mockResolvedValue({
          success: false,
          error: 'Fetch returned an error.'
        })
      });

      const fetchSpy = jest
        .spyOn(fetch, 'default')
        .mockImplementationOnce(() => mockFetch);

      try {
        await callBuildWebhook();
      } catch (e) {
        console.log({ e });
        expect(e).toBeDefined();
      }

      expect(fetchSpy).toBeCalled();
    });
  });

  describe('when getEntry() is called', () => {
    it('it returns an entry from contentful', async () => {
      const res = await getEntry({ id: 'ID' });

      console.log('getEntry', { res });

      expect(res.fields).toEqual(fields);
    });
  });

  describe('when getEntry() throws an error', () => {
    const restore = client.getSpace;

    afterEach(() => {
      client.getSpace = restore;
    });

    it('it handles the error', async () => {
      const error = new Error('fail');

      client.getSpace = jest.fn().mockImplementationOnce(() => ({
        getEnvironment: jest.fn().mockImplementationOnce(() => ({
          getEntry: jest.fn().mockRejectedValueOnce(error)
        }))
      }));

      try {
        await getEntry({ id: 'ID' });
      } catch (e) {
        console.log('getEntry ERROR:', { e });
        expect(e).toBeDefined();
        expect(e).toBe(error);
      }
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

      console.log('updateEntry', res);

      expect(res).toEqual(recipe);
    });
  });
});
