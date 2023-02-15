// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import HomePage, { getStaticProps } from 'pages/index';
import { RecipeSummaryFragment } from 'types/generated/graphql';

import config from 'lib/config';
import * as api from 'lib/api';

jest.mock('lib/config');
jest.mock('lib/api');
jest.mock('components/PageHeadTag/PageHeadTag');

const recipeCollectionData = { content: 'recipe collection' };

describe('HomePage in index.tsx', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const pageContent = [
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
      ];

      const apiSpy = jest.spyOn(api, 'queryRecipeCollectionContent');

      const { defaultTitle } = config?.microcopy?.index ?? {};
      const expectedProps = {
        props: { pageContent: recipeCollectionData, preview: true },
      };

      const expectedDefaultProps = {
        props: { pageContent: recipeCollectionData, preview: false },
      };

      const { container } = render(
        <HomePage
          pageContent={pageContent as RecipeSummaryFragment[]}
          preview={false}
        />
      );

      // assert getStaticProps returns a value and manages preview default
      expect(await getStaticProps({ preview: true })).toEqual(expectedProps);
      expect(await getStaticProps({ preview: undefined })).toEqual(
        expectedDefaultProps
      );
      expect(apiSpy).toHaveBeenCalledTimes(2);

      // assert that page head tags are rendered
      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeInTheDocument();
      defaultTitle && expect(titleTag.text.includes(defaultTitle));

      // assert that page container is rendered
      const page = document.querySelector('.page');
      expect(page).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the page', () => {
      render(<HomePage pageContent={[]} preview={false} />);

      // assert that page container is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });

  describe('when there is no config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', () => {
      render(<HomePage pageContent={[]} preview={false} />);

      // assert that page container is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
