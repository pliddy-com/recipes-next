import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import RecipeGridPage from './RecipeGridPage';
import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('RecipeGridPage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is page content', () => {
    it('it renders the RecipeGridPage', async () => {
      // TODO: derive type
      const [tags] = await api.getRecipeList({});

      const recipes = tags?.linkedFrom?.recipeCollection?.items;

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridPage
          recipes={recipes as unknown as (RecipeDefaultFragment | null)[]}
          title={title}
        />
      );

      // assert that content is rendered
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeInTheDocument())
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the RecipeGridPage', async () => {
      const title = 'Title';
      const recipes = [] as RecipeDefaultFragment[];

      render(<RecipeGridPage title={title} recipes={recipes} />);

      // test if card compoent is not rendered
      await act(async () =>
        waitFor(() =>
          expect(document.querySelector('.MuiCard-root')).toBeNull()
        )
      );
    });
  });

  describe('when there is missing slug information', () => {
    it('it does not sort the content', async () => {
      const title = 'Title';

      const recipes: RecipeDefaultFragment[] = [
        {
          __typename: 'Recipe',
          sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },

          title: 'Title 3',
          slug: 'title-3',
          tagsCollection: {
            items: [
              {
                __typename: 'Tag',
                title: 'Tag 3',
                slug: null
              }
            ],
            __typename: 'RecipeTagsCollection'
          }
        },
        {
          __typename: 'Recipe',
          title: 'Title 1',
          slug: 'title-1',
          sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
          tagsCollection: {
            items: [
              {
                __typename: 'Tag',
                title: 'Tag 1',
                slug: null
              }
            ],
            __typename: 'RecipeTagsCollection'
          }
        },
        {
          __typename: 'Recipe',
          title: 'Title 2',
          slug: 'title-2',
          sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
          tagsCollection: {
            items: [
              {
                __typename: 'Tag',
                title: 'Tag 2',
                slug: 'tag-2'
              }
            ],
            __typename: 'RecipeTagsCollection'
          }
        }
      ];

      const { asFragment } = render(
        <RecipeGridPage title={title} recipes={recipes} />
      );

      await act(async () =>
        waitFor(() => expect(asFragment()).toMatchSnapshot())
      );
    });
  });
});
