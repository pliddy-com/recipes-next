// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

import NavMenuList, { NavMenuListProps } from './NavMenuList';

import { TaxonomyChildrenItem } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

const callback = jest.fn();

describe('NavMenuList', () => {
  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu list', async () => {
      const { categories } = await api.getNavTaxonomy();

      const props: NavMenuListProps = {
        className: 'menuList',
        featuredLabel: 'Categories',
        featuredUrl: '/tags',
        id: 'categories',
        label: 'Categories',
        onClick: callback,
        nav: categories as TaxonomyChildrenItem[],
        root: 'tag',
        showLabel: true
      };

      const { asFragment } = render(<NavMenuList {...props} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there are not properly structured category tags', () => {
    const nav = [
      {
        __typename: 'Tag',
        title: 'Tag A',
        slug: 'tag-a',
        linkedFrom: null
      },
      {
        __typename: 'Tag',
        title: 'Tag B',
        slug: 'tag-b',
        linkedFrom: {
          recipeCollection: null
        }
      },
      {
        __typename: 'Tag',
        title: 'Tag C',
        slug: 'tag-c'
      },
      {
        __typename: 'Taxonomy',
        title: 'Tag D',
        slug: 'tag-d',
        linkedFrom: {
          recipeCollection: null
        }
      }
    ];

    it('it does not render', () => {
      const props: NavMenuListProps = {
        className: 'menuList',
        featuredLabel: 'Categories',
        featuredUrl: '/tags',
        id: 'categories',
        label: 'Categores',
        onClick: callback,
        nav: nav as TaxonomyChildrenItem[],
        root: 'tag',
        showLabel: true
      };

      const { container } = render(<NavMenuList {...props} />);

      expect(container.getElementsByClassName('menu').length).toEqual(0);
    });
  });
});
