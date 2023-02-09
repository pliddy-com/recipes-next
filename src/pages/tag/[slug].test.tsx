// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagPage from './[slug]';

import { ListPageItemFragment } from 'types/generated/graphql';

describe('TagPage in tag/[slug].tsx', () => {
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
                  id: '13DABWfxYIdpP3YGrXS6kk',
                  __typename: 'Sys',
                },
                __typename: 'Recipe',
                title: 'Biscuits',
                slug: 'biscuits',
                abstract:
                  'Traditional baking powder biscuits, baked on a parchment-lined baking sheet.',
                image: {
                  sys: {
                    id: 'B6C4D23gXNDNfGVrxb1DK',
                    __typename: 'Sys',
                  },
                  __typename: 'Asset',
                  title: 'Biscuits',
                  description:
                    'A batch of baking soda biscuits on a parchment-lined baking sheet.',
                  contentType: 'image/jpeg',
                  fileName: 'biscuits.jpg',
                  size: 2583242,
                  url: 'https://images.ctfassets.net/fo9qwg6zarbt/B6C4D23gXNDNfGVrxb1DK/9d8e62c1faf660f7e542eed14e044b57/biscuits.jpg',
                  height: 3024,
                  width: 4032,
                },
                tagsCollection: {
                  items: [
                    {
                      sys: {
                        id: '014itYSAM0Vg2zypswRokk',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Baking',
                      slug: 'baking',
                    },
                    {
                      sys: {
                        id: '30UFYfPfMSgZ4d1kPmeCPM',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Biscuits',
                      slug: 'biscuits',
                    },
                    {
                      sys: {
                        id: '3AQGtSkvlxQgQQMwJqaglw',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Southern',
                      slug: 'southern',
                    },
                  ],
                  __typename: 'RecipeTagsCollection',
                },
              },
              {
                sys: {
                  id: '5qvltoWoIIZvzBJVMWoZ85',
                  __typename: 'Sys',
                },
                __typename: 'Recipe',
                title: 'No-Knead Bread',
                slug: 'no-knead-bread',
                abstract:
                  'A no-knead bread recipe using instant (bread machine) yeast and a dutch oven or covered ceramic bread pan.',
                image: {
                  sys: {
                    id: '6HZDSm8AK4iQHr9v2UOGpq',
                    __typename: 'Sys',
                  },
                  __typename: 'Asset',
                  title: 'No Knead Bread',
                  description:
                    'Loaf of no-knead bread cooling on a wire baking rack.',
                  contentType: 'image/jpeg',
                  fileName: 'no-knead-bread.JPG',
                  size: 2943075,
                  url: 'https://images.ctfassets.net/fo9qwg6zarbt/6HZDSm8AK4iQHr9v2UOGpq/17569d5be00441216338c7800e5ebc2c/no-knead-bread.JPG',
                  height: 3024,
                  width: 4032,
                },
                tagsCollection: {
                  items: [
                    {
                      sys: {
                        id: '014itYSAM0Vg2zypswRokk',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Baking',
                      slug: 'baking',
                    },
                    {
                      sys: {
                        id: '5oUMcctJ6A9EzMnLS4XQdO',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Bread',
                      slug: 'bread',
                    },
                  ],
                  __typename: 'RecipeTagsCollection',
                },
              },
              {
                sys: {
                  id: '3cbUDWABNsvaBc1OcuHzNw',
                  __typename: 'Sys',
                },
                __typename: 'Recipe',
                title: 'No-Knead Olive Bread',
                slug: 'no-knead-olive-bread',
                abstract: 'No-knead bread with olives and seasoning.',
                image: {
                  sys: {
                    id: '2rUa4IhfkLtRRBmHS6ihcD',
                    __typename: 'Sys',
                  },
                  __typename: 'Asset',
                  title: 'Olive Bread',
                  description: 'Loaf of no-knead olive bread',
                  contentType: 'image/jpeg',
                  fileName: 'olive-bread.JPG',
                  size: 2849709,
                  url: 'https://images.ctfassets.net/fo9qwg6zarbt/2rUa4IhfkLtRRBmHS6ihcD/e953337e00d1eba9551b15e7eee18229/olive-bread.JPG',
                  height: 3024,
                  width: 4032,
                },
                tagsCollection: {
                  items: [
                    {
                      sys: {
                        id: '014itYSAM0Vg2zypswRokk',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Baking',
                      slug: 'baking',
                    },
                    {
                      sys: {
                        id: '5oUMcctJ6A9EzMnLS4XQdO',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Bread',
                      slug: 'bread',
                    },
                    {
                      sys: {
                        id: '6cWaSfUY3oU1oKERx29iAk',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Olives',
                      slug: 'olives',
                    },
                    {
                      sys: {
                        id: '58gioVdtuUwFvnPamjosAv',
                        __typename: 'Sys',
                      },
                      __typename: 'Tag',
                      title: 'Mediterranean',
                      slug: 'mediterranean',
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

      // test if card compoent is rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the category page', () => {
      const pageContent = [] as ListPageItemFragment;

      render(<TagPage pageContent={pageContent} preview={false} />);

      // test if card compoent is not rendered
      const page = document.querySelector('.page');
      expect(page).toBeNull();
    });
  });
});
