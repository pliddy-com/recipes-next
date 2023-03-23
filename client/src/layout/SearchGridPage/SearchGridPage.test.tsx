import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import SearchGridPage from './SearchGridPage';
import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('SearchGridPage', () => {
  describe('when there is page content', () => {
    it('it renders the SearchGridPage', async () => {
      // TODO: derive type
      const [tags] = await api.getRecipeList({});

      const recipes = tags?.linkedFrom?.recipeCollection?.items;

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <SearchGridPage
          recipes={recipes as unknown as (RecipeDefaultFragment | null)[]}
          title={title}
        />
      );

      // assert that content is rendered
      expect(queryByTestId('page')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });

    // it('it lazy loads the page when the user scrolls', () => {});
  });

  describe('when there is no pageContent', () => {
    it('it does not render the SearchGridPage', () => {
      const title = 'Title';
      const recipes = [] as RecipeDefaultFragment[];

      render(<SearchGridPage title={title} recipes={recipes} />);

      // test if card compoent is not rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeNull();
    });
  });

  describe('when there is missing slug information', () => {
    it('it does not sort the content', () => {
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
        <SearchGridPage title={title} recipes={recipes} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
