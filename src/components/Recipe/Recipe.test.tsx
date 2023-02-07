// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Recipe from './Recipe';

import { RecipeDefaultFragment } from 'types/generated/graphql';

// import config object to mock
const config = jest.requireMock('lib/config');

jest.mock('lib/config', () => ({
  images: {
    props: {
      recipe: [],
    },
  },
}));

describe('in Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('if there is page content', () => {
    it('it renders the RecipeGrid', () => {
      const content = {
        sys: {
          id: 'sysid-0',
          __typename: 'Sys',
        },
        __typename: 'Recipe',
        title: 'Recipe Title',
        slug: 'recipe-title',
        description: {
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Description rich text',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          links: {
            assets: {
              block: [],
              hyperlink: [],
              __typename: 'RecipeDescriptionAssets',
            },
            entries: {
              inline: [],
              hyperlink: [],
              __typename: 'RecipeDescriptionEntries',
            },
            __typename: 'RecipeDescriptionLinks',
          },
          __typename: 'RecipeDescription',
        },
        abstract: 'Recipe abstract',
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
              label: 'Label',
              instructionList: ['Instructions item 1'],
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
      };

      render(<Recipe content={content as RecipeDefaultFragment} />);

      // test if content is rendered
      const recipe = document.querySelector('.page');
      expect(recipe).toBeInTheDocument();
    });
  });

  describe('if there is no page content', () => {
    // before each test, delete images node from config
    beforeEach(() => {
      delete config.images.props;
    });

    it('it does not render the Recipe', () => {
      const content = undefined;

      render(<Recipe content={content} />);

      // test if content is not rendered
      render(<Recipe content={content} />);

      const recipe = document.querySelector('.page');
      expect(recipe).toBeNull();
    });
  });
});
