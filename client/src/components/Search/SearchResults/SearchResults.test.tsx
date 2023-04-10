// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import SearchResults from './SearchResults';

import * as hooks from 'react-instantsearch-hooks-web';

jest.mock('react-instantsearch-hooks-web', () => ({
  useSearchBox: jest.fn(),
  useHits: jest.fn().mockReturnValue({
    hits: [
      {
        __typename: 'Recipe',
        sys: {
          firstPublishedAt: '2022-06-18T22:42:01.107Z',
          __typename: 'Sys'
        },
        title: 'No-Knead Bread',
        slug: 'no-knead-bread',
        abstract:
          'No-knead bread using instant yeast and a dutch oven or covered ceramic bread pan for a classic, crispy crust.',
        image: {
          __typename: 'Asset',
          title: 'No Knead Bread',
          description: 'Loaf of no-knead bread cooling on a wire baking rack.',
          contentType: 'image/jpeg',
          fileName: 'no-knead-bread.JPG',
          size: 2943075,
          url: 'https://images.ctfassets.net/fo9qwg6zarbt/6HZDSm8AK4iQHr9v2UOGpq/17569d5be00441216338c7800e5ebc2c/no-knead-bread.JPG',
          height: 3024,
          width: 4032
        },
        tagsCollection: {
          items: [
            {
              __typename: 'Tag',
              title: 'Baking',
              slug: 'baking'
            },
            {
              __typename: 'Tag',
              title: 'Bread',
              slug: 'bread'
            }
          ],
          __typename: 'RecipeTagsCollection'
        }
      },
      {
        __typename: 'Recipe',
        sys: {
          firstPublishedAt: '2022-06-17T00:02:14.528Z',
          __typename: 'Sys'
        },
        title: 'Biscuits',
        slug: 'biscuits',
        abstract:
          'Traditional baking powder biscuits that use grated frozen butter and folded dough to give the biscuits a soft, flaky texture.',
        image: {
          __typename: 'Asset',
          title: 'Biscuits',
          description:
            'A batch of baking soda biscuits on a parchment-lined baking sheet.',
          contentType: 'image/jpeg',
          fileName: 'biscuits.jpg',
          size: 2583242,
          url: 'https://images.ctfassets.net/fo9qwg6zarbt/B6C4D23gXNDNfGVrxb1DK/9d8e62c1faf660f7e542eed14e044b57/biscuits.jpg',
          height: 3024,
          width: 4032
        },
        tagsCollection: {
          items: [
            {
              __typename: 'Tag',
              title: 'Baking',
              slug: 'baking'
            },
            {
              __typename: 'Tag',
              title: 'Biscuits',
              slug: 'biscuits'
            },
            {
              __typename: 'Tag',
              title: 'Breakfast',
              slug: 'breakfast'
            },
            {
              __typename: 'Tag',
              title: 'Southern',
              slug: 'southern'
            }
          ],
          __typename: 'RecipeTagsCollection'
        }
      },
      {
        __typename: 'Recipe',
        sys: {
          firstPublishedAt: '2022-11-15T21:50:41.051Z',
          __typename: 'Sys'
        },
        title: 'No-Knead Olive Bread',
        slug: 'no-knead-olive-bread',
        abstract:
          'A savory variation of no-knead bread with the addition of olives, garlic, and rosemary to give it a Mediterranean twist.',
        image: {
          __typename: 'Asset',
          title: 'Olive Bread',
          description: 'Loaf of no-knead olive bread',
          contentType: 'image/jpeg',
          fileName: 'olive-bread.JPG',
          size: 2849709,
          url: 'https://images.ctfassets.net/fo9qwg6zarbt/2rUa4IhfkLtRRBmHS6ihcD/e953337e00d1eba9551b15e7eee18229/olive-bread.JPG',
          height: 3024,
          width: 4032
        },
        tagsCollection: {
          items: [
            {
              __typename: 'Tag',
              title: 'Baking',
              slug: 'baking'
            },
            {
              __typename: 'Tag',
              title: 'Bread',
              slug: 'bread'
            },
            {
              __typename: 'Tag',
              title: 'Olives',
              slug: 'olives'
            },
            {
              __typename: 'Tag',
              title: 'Mediterranean',
              slug: 'mediterranean'
            }
          ],
          __typename: 'RecipeTagsCollection'
        }
      }
    ]
  })
}));

describe('SearchResults', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is a query', () => {
    it('it renders the SearchResults', () => {
      jest.spyOn(hooks, 'useSearchBox').mockReturnValueOnce({
        query: 'test query',
        refine: jest.fn(),
        clear: jest.fn(),
        isSearchStalled: false
      });

      const title = 'Recipe Title';
      const { asFragment } = render(
        <SearchResults title={title} numRecipes={3} />
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no query', () => {
    it('it renders the SearchResults', () => {
      jest.spyOn(hooks, 'useSearchBox').mockReturnValueOnce({
        query: '',
        refine: jest.fn(),
        clear: jest.fn(),
        isSearchStalled: false
      });

      const title = 'Recipe Title';
      const { asFragment } = render(
        <SearchResults title={title} numRecipes={3} />
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there are no hits', () => {
    it('it renders the default headings', () => {
      jest.spyOn(hooks, 'useSearchBox').mockReturnValueOnce({
        query: 'test query',
        refine: jest.fn(),
        clear: jest.fn(),
        isSearchStalled: false
      });

      jest.spyOn(hooks, 'useHits').mockReturnValueOnce({
        hits: [],
        sendEvent: jest.fn(),
        bindEvent: jest.fn()
      });

      const title = 'Recipe Title';
      const { asFragment } = render(
        <SearchResults title={title} numRecipes={3} />
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
