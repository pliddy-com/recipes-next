// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagPage from './[slug]';

import { ListPageItemFragment } from 'types/generated/graphql';

// import config object to mock
const config = jest.requireMock('lib/config');

// set up default mock config object
jest.mock('lib/config', () => ({
  microcopy: {
    tag: {
      defaultTitle: 'Default Tag Title',
      defaultDescription: 'Index tag description',
    },
    site: {
      title: 'Site Title',
    },
  },
}));

describe('TagPage in tag/[slug].tsx', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the TagPage if there is content', () => {
      const pageContent = {
        slug: 'baking',
        title: 'Baking',
        linkedFrom: {
          recipeCollection: {
            total: 3,
            items: [
              {
                sys: {
                  id: 'sysid-0',
                  __typename: 'Sys',
                },
                __typename: 'Recipe',
                title: 'Recipe 1 Title',
                slug: 'recipe-1-title',
                abstract: 'Recipe 1 abstract.',
                image: {
                  sys: {
                    id: 'sysid-1',
                    __typename: 'Sys',
                  },
                  __typename: 'Asset',
                  title: 'Image 1 Title',
                  description: 'Image 1 description',
                  contentType: 'image/jpeg',
                  fileName: 'image1.jpg',
                  size: 99999,
                  url: 'https://test.url/biscuits.jpg',
                  height: 300,
                  width: 400,
                },
                tagsCollection: {
                  items: [
                    {
                      sys: {
                        id: 'sysid-2',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Tag 1',
                      slug: 'tag-1',
                    },
                    {
                      sys: {
                        id: 'sysid-3',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Tag 2',
                      slug: 'tag-2',
                    },
                  ],
                  __typename: 'RecipeTagsCollection',
                },
              },
            ],
            __typename: 'RecipeCollection',
          },
          __typename: 'TagLinkingCollections',
        },
        __typename: 'Tag',
      };

      const { container } = render(
        <TagPage
          pageContent={pageContent as ListPageItemFragment}
          preview={false}
        />
      );

      // assert that page head tags are rendered
      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(pageContent.title));

      // assert that page container is rendered
      const page = document.querySelector('.page');
      expect(page).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the category page', () => {
      const pageContent = undefined as unknown as ListPageItemFragment;

      render(<TagPage pageContent={pageContent} preview={false} />);

      // test if card compoent is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
