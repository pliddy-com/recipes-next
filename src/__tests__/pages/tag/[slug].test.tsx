// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagPage, { getStaticPaths, getStaticProps } from 'pages/tag/[slug]';
import { ListPageItemFragment } from 'types/generated/graphql';

import * as api from 'lib/api';
import config from 'lib/config';

jest.mock('lib/api');
jest.mock('lib/config');
jest.mock('components/PageHeadTag/PageHeadTag');

const pageContentData = { content: 'list page content' };
const tagSlugData = { slug: 'slug-1' };

describe('TagPage in tag/[slug].tsx', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
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

    it('it renders the page', async () => {
      const propsContext = {
        preview: false,
        params: tagSlugData,
      };

      const expectedProps = {
        props: { pageContent: pageContentData, preview: false },
      };

      const expectedPaths = {
        fallback: false,
        paths: [{ params: tagSlugData }],
      };

      const queryTagSlugsSpy = jest.spyOn(api, 'queryTagSlugs');
      const queryListPageContentSpy = jest.spyOn(api, 'queryListPageContent');

      const { container } = render(
        <TagPage
          pageContent={pageContent as ListPageItemFragment}
          preview={false}
        />
      );

      expect(await getStaticProps(propsContext)).toEqual(expectedProps);
      expect(await getStaticPaths({})).toEqual(expectedPaths);

      expect(queryTagSlugsSpy).toHaveBeenCalled();
      expect(queryListPageContentSpy).toHaveBeenCalled();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();

      // assert that page head tags are rendered
      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(pageContent.title));

      // assert that page container is rendered
      const page = document.querySelector('.page');
      expect(page).toBeInTheDocument();
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
