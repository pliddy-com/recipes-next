// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipePage, {
  getStaticPaths,
  getStaticProps,
} from 'pages/recipe/[slug]';

import { RecipeDefaultFragment } from 'types/generated/graphql';

import config from 'lib/config';
import * as api from 'lib/api';

jest.mock('lib/config');
jest.mock('lib/api');
jest.mock('components/PageHeadTag/PageHeadTag');

describe('RecipePage in recipe/[slug].tsx', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    const pageContent: RecipeDefaultFragment = {
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

    it('it renders the page', async () => {
      const propsContext = {
        preview: false,
        params: { slug: 'slug-2' },
      };

      const expectedProps = {
        props: {
          pageContent: {
            title: 'Recipe Title',
            slug: 'slug-1',
          },
          preview: false,
        },
        revalidate: 60,
      };

      const expectedPaths = {
        fallback: false,
        paths: [{ params: { slug: 'slug-1' } }, { params: { slug: 'slug-2' } }],
      };

      const getRecipeSlugsSpy = jest.spyOn(api, 'getRecipeSlugs');
      const getRecipeSpy = jest.spyOn(api, 'getRecipePage');

      const { container } = render(
        <RecipePage pageContent={pageContent} preview={false} />
      );

      expect(await getStaticProps(propsContext)).toEqual(expectedProps);
      expect(await getStaticPaths({})).toEqual(expectedPaths);

      expect(getRecipeSlugsSpy).toHaveBeenCalled();
      expect(getRecipeSpy).toHaveBeenCalled();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();

      // assert that page head tags are rendered
      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(pageContent.title as string));

      // test if content is rendered
      const recipe = document.querySelector('.page');
      expect(recipe).toBeInTheDocument();
    });

    describe('when the slug is not a string', () => {
      it('it does not render the page', async () => {
        const propsContext = {
          preview: false,
          params: { slug: undefined },
        };

        try {
          await getStaticProps(propsContext);
        } catch (e) {
          expect(e).toEqual(new Error('Error in SSG!'));
        }
      });
    });
  });

  describe('when there is no page content', () => {
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', () => {
      const pageContent = undefined as unknown as RecipeDefaultFragment;

      render(<RecipePage pageContent={pageContent} preview={false} />);

      // test if card compoent is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
