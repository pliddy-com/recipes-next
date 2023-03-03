export interface ApiTestProps {
  getNavTaxonomy: () => [{ slug: string }];
  getRecipeSlugs: () => string[];
  getTagSlugs: () => string[];
  getRecipeIndex: () => [{ slug: string }];
  getRecipeList: () => [{ slug: string }];
  getRecipePage: () => { slug: string; title: string };
  getTagIndex: () => [{ slug: string; title: string }];
}

import * as urql from 'urql';
import { Client } from 'urql';
import { never } from 'wonka';

jest.mock('urql');
const mockedUrql = urql as jest.Mocked<typeof urql>;

const client = {
  query: jest.fn(() => never),
};

mockedUrql.createClient.mockReturnValue(client as unknown as Client);

// import api library to mock
const api: ApiTestProps = jest.createMockFromModule('lib/api');

api.getNavTaxonomy = jest.fn().mockResolvedValue({
  categories: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' },
  ],
  cuisine: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' },
  ],
  tags: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' },
  ],
});

api.getRecipeSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getTagSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getRecipeIndex = jest.fn().mockResolvedValue([
  {
    slug: 'slug-1',
    title: 'Title 1',
  },
  {
    slug: 'slug-2',
    title: 'Title 2',
  },
]);

api.getRecipeList = jest.fn().mockResolvedValue([
  {
    title: 'Tag',
    slug: 'tag',
    linkedFrom: {
      recipeCollection: {
        items: [
          {
            slug: 'slug-1',
            title: 'Title 1',
          },
          {
            slug: 'slug-2',
            title: 'Title 2',
          },
        ],
      },
    },
  },
]);

api.getRecipePage = jest.fn().mockResolvedValue({
  recipe: {
    title: 'Recipe Title',
    slug: 'slug-1',
    __typename: 'Recipe',
    sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
    abstract: 'abstract',
    recipeYield: 4,
    prepTime: 15,
    cookTime: 60,
    keywords: ['keyword1', 'keyword2'],
    image: {
      sys: {
        id: 'sysid-1',
        __typename: 'Sys',
      },
      __typename: 'Asset',
      title: 'Image Title',
      description: 'Image description.',
      contentType: 'image/jpeg',
      fileName: 'filename.jpg',
      size: 99999,
      url: 'https://recipes.pliddy.com/url',
      height: 300,
      width: 400,
    },
    ingredientsCollection: {
      items: [
        {
          sys: {
            id: 'sysid-2',
            __typename: 'Sys',
          },
          title: 'Ingredients Title',
          slug: 'ingredients-title',
          label: 'Ingredients',
          ingredientList: ['ingredient 1', 'ingredient 2'],
          __typename: 'IngredientSection',
        },
      ],
      __typename: 'RecipeIngredientsCollection',
    },
    equipment: ['equipment 1', 'equipment 2'],
    instructionsCollection: {
      items: [
        {
          sys: {
            id: 'sysid-3',
            __typename: 'Sys',
          },
          title: 'Instructions Title',
          slug: 'instructions-title',
          label: 'Label 1',
          instructionList: ['Instructions item 1'],
          __typename: 'InstructionSection',
        },
        {
          sys: {
            id: 'sysid-7',
            __typename: 'Sys',
          },
          title: 'Instructions Title 2',
          slug: 'instructions-title',
          label: 'Label 2',
          instructionList: ['Instructions item 2', 'Instructions item 3'],
          __typename: 'InstructionSection',
        },
      ],
      __typename: 'RecipeInstructionsCollection',
    },
    notes: ['note 1'],
    tagsCollection: {
      items: [
        {
          sys: {
            id: 'sysid-4',
            __typename: 'Sys',
          },
          __typename: 'Tag',
          title: 'Tag 1',
          slug: 'tag-1',
        },
      ],
      __typename: 'RecipeTagsCollection',
    },
  },
  cuisine: [
    {
      __typename: 'Tag',
      title: 'Tag 1 Title',
      slug: 'tag-1',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-1',
              title: 'Title 2',
            },
            {
              __typename: 'Recipe',
              slug: 'slug-2',
              title: 'Title 1',
            },
          ],
        },
      },
    },
    {
      __typename: 'Tag',
      title: 'Tag 2 Title',
      slug: 'tag-2',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-3',
              title: 'Title 3',
            },
            {
              __typename: 'Recipe',
              slug: 'slug-4',
              title: 'Title 5',
            },
          ],
        },
      },
    },
  ],
  categories: [
    {
      __typename: 'Tag',
      title: 'Tag 1 Title',
      slug: 'tag-1',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-1',
              title: 'Title 2',
            },
            {
              __typename: 'Recipe',
              slug: 'slug-2',
              title: 'Title 1',
            },
          ],
        },
      },
    },
    {
      __typename: 'Tag',
      title: 'Tag 2 Title',
      slug: 'tag-2',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-3',
              title: 'Title 3',
            },
            {
              __typename: 'Recipe',
              slug: 'slug-4',
              title: 'Title 5',
            },
          ],
        },
      },
    },
  ],
});

api.getTagIndex = jest.fn().mockResolvedValue([
  {
    __typename: 'Tag',
    title: 'Tag 1 Title',
    slug: 'tag-1',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        items: [
          {
            __typename: 'Recipe',
            slug: 'slug-1',
            title: 'Title 2',
          },
          {
            __typename: 'Recipe',
            slug: 'slug-2',
            title: 'Title 1',
          },
        ],
      },
    },
  },
  {
    __typename: 'Tag',
    title: 'Tag 2 Title',
    slug: 'tag-2',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        items: [
          {
            __typename: 'Recipe',
            slug: 'slug-3',
            title: 'Title 3',
          },
          {
            __typename: 'Recipe',
            slug: 'slug-4',
            title: 'Title 5',
          },
        ],
      },
    },
  },
]);

module.exports = api;
