// import testing-library methods
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavBar from './NavBar';

import { Taxonomy } from 'types/generated/graphql';

describe('NavMenu', () => {
  describe('if there is a properly structured nav property', () => {
    const nav = {
      sys: {
        id: 'sys-id-0',
      },
      __typename: 'Taxonomy',
      title: 'Categories',
      slug: 'categories',
      tag: null,
      childrenCollection: {
        total: 2,
        items: [
          {
            sys: {
              id: 'sys-id-1',
            },
            __typename: 'Tag',
            title: 'Category 1',
            slug: 'category-1',
            linkedFrom: {
              recipeCollection: {
                total: 3,
              },
            },
          },
          {
            sys: {
              id: 'sys-id-2',
            },
            __typename: 'Taxonomy',
            title: 'Category 2',
            slug: 'category-2',
            tag: {
              sys: {
                id: 'sys-id-3',
              },
              __typename: 'Tag',
              title: 'Category 2 Tag',
              slug: 'category-2',
              linkedFrom: {
                recipeCollection: {
                  total: 2,
                },
              },
            },
            childrenCollection: {
              total: 3,
              items: [
                {
                  sys: {
                    id: 'sys-id-4',
                  },
                  __typename: 'Tag',
                  title: 'Subcategory 2a',
                  slug: 'subcategory-2a',
                  linkedFrom: {
                    recipeCollection: {
                      total: 1,
                    },
                  },
                },
                {
                  sys: {
                    id: 'sys-id-5',
                  },
                  __typename: 'Tag',
                  title: 'Subcategory 2b',
                  slug: 'subcategoy-2b',
                  linkedFrom: {
                    recipeCollection: {
                      total: 0,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    it('it renders a nav bar', async () => {
      const { container } = render(<NavBar nav={nav as Taxonomy} />);

      expect(container.getElementsByClassName('MuiAppBar-root'));

      // confirm that button has been rendered
      const button = screen.queryByRole('button', { name: 'open drawer' });
      expect(button).toBeInTheDocument();

      const drawer = container.getElementsByClassName('MuiDrawer-paper');
      waitFor(() => expect(drawer).not.toBeVisible());

      // confirm that callback is called on click
      button && fireEvent.click(button);

      // test for change in DOM
      waitFor(() => expect(drawer).toBeVisible());
    });
  });
});
