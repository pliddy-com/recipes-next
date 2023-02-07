// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeCard from 'components/RecipeCard/RecipeCard';

import { Maybe, RecipeDefaultFragment } from 'types/generated/graphql';

// import config object to mock
const config = jest.requireMock('lib/config');

jest.mock('lib/config', () => ({
  images: {
    props: {
      card: [],
    },
  },
}));

describe('in RecipeCard', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('if there are config properties', () => {
    it('renders the RecipeCard if there is content', () => {
      const recipe: Maybe<RecipeDefaultFragment> = {
        sys: {
          id: 'sysid_0',
        },
        __typename: 'Recipe',
        title: 'Basmati Rice',
        slug: 'basmati-rice',
        abstract: 'Traditional basmati rice cooked in a covered skillet.',
        image: {
          sys: {
            id: 'sysid_1',
            __typename: 'Sys',
          },
          __typename: 'Asset',
          title: 'basmati-rice',
          description: 'Skillet with basmati rice and chopped parsley.',
          contentType: 'image/jpeg',
          fileName: 'basmati-rice.jpg',
          size: 2293160,
          url: 'https://images.ctfassets.net/fo9qwg6zarbt/2Y8FHjjNDYCcsflAJq4Q5j/6615d77fa788a39e5d9135b9def8d006/basmati-rice.jpg',
          height: 3024,
          width: 4032,
        },
        tagsCollection: {
          items: [
            {
              sys: {
                id: 'sysid_2',
                __typename: 'Sys',
              },
              __typename: 'Tag',
              title: 'Vegetables',
              slug: 'vegetables',
            },
          ],
          __typename: 'RecipeTagsCollection',
        },
      };

      const preload = true;

      render(<RecipeCard recipe={recipe} preloadImg={preload} />);

      const card = document.querySelector('.recipe');
      expect(card).toBeInTheDocument();
    });

    it('does not render the RecipeCard if there is no content', () => {
      const recipe = undefined;

      render(<RecipeCard recipe={recipe} />);

      const card = document.querySelector('.recipe');
      expect(card).toBeNull();
    });
  });

  describe('if there are no config properties', () => {
    // before each test, delete images node from config
    beforeEach(() => {
      delete config.images.props;
    });

    it('it does not render the RecipeCard', () => {
      const recipe: RecipeDefaultFragment = {
        title: 'Basmati Rice',
        slug: 'basmati-rice',
        abstract: 'Traditional basmati rice cooked in a covered skillet.',
        image: {
          sys: {
            id: 'sysid_1',
          },
          __typename: 'Asset',
        },
        tagsCollection: {
          items: [
            {
              sys: {
                id: 'sysid_2',
                __typename: 'Sys',
              },
              __typename: 'Tag',
              title: 'Vegetables',
              slug: 'vegetables',
            },
          ],
        },
        __typename: 'Recipe',
        sys: {
          __typename: undefined,
          id: '',
        },
      };

      render(<RecipeCard recipe={recipe} />);

      const card = document.querySelector('.recipe');
      expect(card).toBeNull();
    });
  });
});
