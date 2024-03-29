// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import PreviewCard from './PreviewCard';

import { Maybe, RecipeDefaultFragment } from 'types/queries';

import { previewCardConfig } from 'theme/values/images';
jest.createMockFromModule('theme/values/images');

describe('PreviewCard', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is content', () => {
    const recipe: Maybe<RecipeDefaultFragment> = {
      __typename: 'Recipe',
      sys: {
        id: 'test-id',
        firstPublishedAt: '2022-06-26T07:24:30.384Z'
      },
      title: 'Basmati Rice',
      slug: 'basmati-rice',
      abstract: 'Traditional basmati rice cooked in a covered skillet.',
      image: {
        __typename: 'Asset',
        sys: {
          id: 'img-id'
        },
        title: 'basmati-rice',
        description: 'Skillet with basmati rice and chopped parsley.',
        contentType: 'image/jpeg',
        fileName: 'basmati-rice.jpg',
        size: 2293160,
        url: 'https://images.ctfassets.net/fo9qwg6zarbt/2Y8FHjjNDYCcsflAJq4Q5j/6615d77fa788a39e5d9135b9def8d006/basmati-rice.jpg',
        height: 3024,
        width: 4032
      },
      tagsCollection: {
        items: [
          {
            __typename: 'Tag',
            sys: {
              id: 'tag-id-1'
            },
            title: 'Vegetables',
            slug: 'vegetables'
          }
        ],
        __typename: 'RecipeTagsCollection'
      }
    };

    it('it renders the PreviewCard', () => {
      const preload = true;

      const { container } = render(
        <PreviewCard recipe={recipe} preloadImg={preload} />
      );

      const card = document.querySelector('.preview');
      expect(card).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no content', () => {
    const recipe = undefined;
    it('does not render', () => {
      render(<PreviewCard recipe={recipe} />);

      const card = document.querySelector('.preview');
      expect(card).toBeNull();
    });
  });

  describe('when there are no config properties', () => {
    // before each test, delete images node from config
    beforeEach(() => {
      delete previewCardConfig.breakpoints;
    });

    const recipe: RecipeDefaultFragment = {
      title: 'Basmati Rice',
      slug: 'basmati-rice',
      sys: {
        id: 'test-id',
        firstPublishedAt: '2022-06-26T07:24:30.384Z'
      },
      abstract: 'Traditional basmati rice cooked in a covered skillet.',
      image: {
        __typename: 'Asset',
        sys: {
          id: 'img-id'
        }
      },
      tagsCollection: {
        items: [
          {
            __typename: 'Tag',
            sys: {
              id: 'tag-id-1'
            },
            title: 'Vegetables',
            slug: 'vegetables'
          }
        ]
      },
      __typename: 'Recipe'
    };

    it('it does not render', () => {
      render(<PreviewCard recipe={recipe} />);

      const card = document.querySelector('.preview');
      expect(card).toBeNull();
    });
  });
});
