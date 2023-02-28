// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipePage from './RecipePage';

import { RecipeDefaultFragment } from 'types/queries';

import config from './RecipePage.config';

jest.createMockFromModule('./RecipePage.config');

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', () => {
      const content = {
        sys: {
          id: 'sysid-0',
          __typename: 'Sys',
          firstPublishedAt: '2022-06-26T07:24:30.384Z',
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

      const { asFragment, queryByTestId } = render(
        <RecipePage content={content as RecipeDefaultFragment} />
      );

      // assert that content is rendered
      expect(queryByTestId('RecipePage')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    // before each test, delete images node from config
    beforeEach(() => {
      delete config.breakpoints;
    });

    it('it does not render the Recipe', () => {
      const content = undefined;

      render(<RecipePage content={content} />);

      // test if content is not rendered
      render(<RecipePage content={content} />);

      const recipe = document.querySelector('.page');
      expect(recipe).toBeNull();
    });
  });
});
