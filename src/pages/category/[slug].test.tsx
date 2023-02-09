// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryPage from './[slug]';

import { ListPageItemFragment } from 'types/generated/graphql';

// import config object to mock
const config = jest.requireMock('lib/config');

// set up default mock config object
jest.mock('lib/config', () => ({
  microcopy: {
    index: {
      defaultTitle: 'Default Index Title',
      description: 'Index page description',
    },
    site: {
      title: 'Site Title',
    },
  },
}));

// import api library to mock
// const api = jest.requireMock('lib/api');

// set up default mock api object
// jest.mock('lib/api', () => ({
//   queryListPageContent: jest
//     .fn()
//     .mockResolvedValue({ data: 'list page content' }),
//   queryCategorySlugs: jest.fn().mockResolvedValue({ data: 'category slugs' }),
// }));

describe('CategoryPage in category/[slug].tsx', () => {
  describe('when there is page content', () => {
    it('it renders the CategoryPage if there is content', () => {
      const pageContent = {
        slug: 'category-title',
        title: 'Category Title',
        linkedFrom: {
          recipeCollection: {
            total: 1,
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
        <CategoryPage
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

  describe('when there is no content', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', () => {
      const pageContent = undefined as unknown as ListPageItemFragment;

      render(<CategoryPage pageContent={pageContent} preview={false} />);

      // test if card compoent is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });

  describe('when there is no config object', () => {
    it('it does not render the page', () => {
      render(
        <CategoryPage
          preview={false}
          pageContent={{
            __typename: undefined,
            slug: undefined,
            title: undefined,
            linkedFrom: undefined,
          }}
        />
      );

      // assert that page container is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
