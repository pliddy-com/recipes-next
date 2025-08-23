import client from './contentful';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

import {
  callBuildWebhook,
  getEntry,
  getResponse,
  updateEntry
} from './entries';
import { IRecipeChangeSet } from './types';

const id = 'ID';

const recipe: IRecipeChangeSet = {
  abstract: 'abstract',
  cookTime: '30',
  equipment: ['equipment 1'],
  image: {
    sys: {
      id: 'img-id'
    },
    title: 'Placeholder',
    description: 'Image description.',
    contentType: 'image/png',
    fileName: 'placeholder.png',
    size: 33142,
    url: 'https://images.url',
    height: 1350,
    width: 1800,
    __typename: 'Asset'
  },
  id: 'ID',
  ingredientsList: [
    {
      sectionTitle: 'Ingredients Section',
      sectionItems: ['ingredient 1', 'ingredient 2']
    }
  ],
  instructionsList: [
    {
      sectionTitle: 'Instructions Section',
      sectionItems: ['Instruction 1', 'Instruction 2']
    }
  ],
  keywords: ['keyword 1', 'keyword 2'],
  notes: ['note 1'],
  prepTime: '15',
  recipeYield: '4',
  slug: 'slug',
  tags: [
    {
      __typename: 'Tag',
      sys: {
        id: 'id-1'
      },
      slug: 'title-1',
      title: 'Title 1'
    }
  ],
  title: 'title'
};

const fields = {
  abstract: { 'en-US': 'abstract' },
  cookTime: { 'en-US': 30 },
  id: { 'en-US': 'ID' },
  equipment: { 'en-US': ['equipment 1'] },
  ingredientsList: {
    'en-US': [
      {
        sectionTitle: 'Ingredients Section',
        sectionItems: ['ingredient 1', 'ingredient 2']
      }
    ]
  },
  instructionsList: {
    'en-US': [
      {
        sectionTitle: 'Instructions Section',
        sectionItems: ['Instruction 1', 'Instruction 2']
      }
    ]
  },
  keywords: { 'en-US': ['keyword 1', 'keyword 2'] },
  notes: { 'en-US': ['note 1'] },
  prepTime: { 'en-US': 15 },
  recipeYield: { 'en-US': 4 },
  slug: { 'en-US': 'slug' },
  tags: [
    {
      sys: { type: 'Link', linkType: 'Entry', id: 'id-1' }
    }
  ],
  title: { 'en-US': 'title' }
};

jest
  .spyOn(global, 'fetch')
  .mockImplementation(
    jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) })
    ) as jest.Mock
  );

jest.mock('./contentful');

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('in entries.ts', () => {
  beforeEach(() => {
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

  describe('for callBuildWebhook()', () => {
    describe('when callBuildWebhook() is called', () => {
      it('it returns true on success', async () => {
        const result = await callBuildWebhook();
        expect(result).toEqual(true);
      });
    });

    describe('when there is no webhook url', () => {
      const env = process.env;

      beforeEach(() => {
        process.env = {
          ...env
        };
        delete process.env.GH_WEBHOOK_URL;

        jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        process.env = env;
      });

      it('it throws an error', async () => {
        const error = new Error('Webhook URL not available.');

        try {
          await await callBuildWebhook();
        } catch (err) {
          expect(err).toEqual(error);
        }
      });
    });

    describe('when fetch throws an error', () => {
      beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      it('it handles the error', async () => {
        const mockFetch = Promise.reject({
          status: 400,
          json: jest.fn().mockResolvedValue({
            success: false,
            error: 'Fetch returned an error.'
          })
        });

        const fetchSpy = jest
          .spyOn(global, 'fetch')
          .mockImplementationOnce(() => mockFetch);

        try {
          await callBuildWebhook();
        } catch (e) {
          expect(e).toBeDefined();
        }

        expect(fetchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('for getEntry()', () => {
    describe('when getEntry() is called', () => {
      it('it returns an entry from contentful', async () => {
        const res = await getEntry({ id });
        expect(res.fields).toEqual(fields);
      });
    });

    describe('when getEntry() throws an error', () => {
      const restoreSpace = client.getSpace;

      beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        client.getSpace = restoreSpace;
      });

      it('it handles the error', async () => {
        const error = new Error('fail');

        client.getSpace = jest.fn().mockImplementationOnce(() => ({
          getEnvironment: jest.fn().mockImplementationOnce(() => ({
            getEntry: jest.fn().mockRejectedValueOnce(error)
          }))
        }));

        try {
          await getEntry({ id });
        } catch (err) {
          expect(err).toBeDefined();
          expect(err).toBe(error);
        }
      });
    });

    describe('for updateEntry()', () => {
      describe('when updateEntry() is called', () => {
        it('it returns the updated recipe properties', async () => {
          const res = await updateEntry({ id, recipe });
          expect(res).toEqual(recipe);
        });
      });

      describe('when there is no id', () => {
        beforeEach(() => {
          jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        it('it throws an error', async () => {
          const error = new Error('No ID provided.');

          try {
            await updateEntry({ id: undefined as unknown as string, recipe });
          } catch (err) {
            expect(err).toBeDefined();
            expect(err).toEqual(error);
          }
        });
      });
    });

    describe('when updateEntry() throws an error', () => {
      const restoreSpace = client.getSpace;

      beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        client.getSpace = restoreSpace;
      });

      it('it handles the error', async () => {
        const error = new Error('fail');

        client.getSpace = jest.fn().mockImplementationOnce(() => ({
          getEnvironment: jest.fn().mockImplementationOnce(() => ({
            getEntry: jest.fn().mockRejectedValueOnce(error)
          }))
        }));

        try {
          await updateEntry({ id, recipe });
        } catch (err) {
          expect(err).toBeDefined();
          expect(err).toBe(error);
        }
      });
    });
  });
});
