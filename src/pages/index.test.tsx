// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryPage from './index';

import { RecipeSummaryFragment } from 'types/generated/graphql';

import config from 'lib/config';

describe('CategoryPage in category/[slug].tsx', () => {
  describe('when there is page content', () => {
    it('it renders the CategoryPage if there is content', () => {
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

      const { defaultTitle } = config?.microcopy?.index ?? {};

      const { container } = render(
        <CategoryPage
          pageContent={pageContent as RecipeSummaryFragment[]}
          preview={false}
        />
      );

      // assert that page head tags are rendered
      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(defaultTitle));

      // assert that page container is rendered
      const page = document.querySelector('.page');
      expect(page).toBeInTheDocument();

      // test if card compoent is rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the category page', () => {
      const pageContent = [] as RecipeSummaryFragment[];

      render(<CategoryPage pageContent={pageContent} preview={false} />);

      // test if card compoent is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
