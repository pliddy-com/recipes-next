// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavMenu from './NavMenu';

import { Taxonomy } from 'types/generated/graphql';

describe('NavMenu', () => {
  describe('when there is a properly structured nav property', () => {
    const nav = {
      sys: {
        id: 'sys-id-0',
      },
      __typename: 'Taxonomy',
      title: 'Categories',
      slug: 'categories',
      tag: null,
      childrenCollection: {
        total: 3,
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
          {
            sys: {
              id: 'sys-id-6',
            },
            __typename: 'Tag',
            title: 'Category 6',
            slug: 'category-6',
            linkedFrom: {
              recipeCollection: {
                total: 0,
              },
            },
          },
        ],
      },
    };

    it('it renders a nav menu hidden by default', () => {
      const onClick = jest.fn();
      const isOpen = false;

      const component = render(
        <NavMenu nav={nav as Taxonomy} onClick={onClick} isOpen={isOpen} />
      );

      const { container } = component;

      expect(container.getElementsByClassName('menu'));

      // assert that the component matches the existing snapshot
      // test snapshot against component since container is rendered hidden
      // and doesn't show up in initial container
      expect(component).toMatchSnapshot();
    });
  });

  describe('when there is not a properly structured nav property', () => {
    const nav = undefined;

    it('it does not render', () => {
      const isOpen = false;
      const onClick = jest.fn();

      const { container } = render(
        <NavMenu nav={nav} onClick={onClick} isOpen={isOpen} />
      );

      expect(container.getElementsByClassName('menu').length).toEqual(0);
    });
  });

  describe('when there are not properly structured category tags', () => {
    const nav = {
      sys: {
        id: 'sys-id-0',
      },
      __typename: 'Taxonomy',
      title: 'Categories',
      slug: 'categories',
      tag: null,
      childrenCollection: {
        total: 3,
        items: [
          null,
          {
            sys: {
              id: 'sys-id-1',
            },
            __typename: 'Taxonomy',
            title: 'Category 1',
            slug: 'category-1',
            tag: {
              sys: {
                id: 'sys-id-2',
              },
              __typename: 'Tag',
              title: 'Category 2 Tag',
              slug: 'category-2',
            },
            childrenCollection: {
              total: 3,
              items: [
                {
                  sys: {
                    id: 'sys-id-3',
                  },
                  __typename: 'Tag',
                  title: 'Subcategory 2a',
                  slug: 'subcategory-2a',
                  linkedFrom: null,
                },
                {
                  sys: {
                    id: 'sys-id-4',
                  },
                  __typename: 'Tag',
                  title: 'Subcategory 2a',
                  slug: 'subcategory-2a',
                  linkedFrom: {
                    recipeCollection: null,
                  },
                },
              ],
            },
          },
          {
            sys: {
              id: 'sys-id-5',
            },
            __typename: 'Tag',
            title: 'Category 6',
            slug: 'category-6',
            linkedFrom: {
              recipeCollection: null,
            },
          },
        ],
      },
    };

    it('it does not render', () => {
      const isOpen = false;
      const onClick = jest.fn();

      const { container } = render(
        <NavMenu nav={nav as Taxonomy} onClick={onClick} isOpen={isOpen} />
      );

      expect(container.getElementsByClassName('menu').length).toEqual(0);
    });
  });
});
