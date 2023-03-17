// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavMenu from './NavMenu';

import { TaxonomyChildrenItem } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('NavMenu', () => {
  const root = 'category';

  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu hidden by default', async () => {
      const nav = await api.getNavTaxonomy();

      const onClick = jest.fn();
      const isOpen = false;

      const featuredLabel = 'Label';
      const featuredUrl = 'http://test.url';

      const { asFragment, container } = render(
        <NavMenu
          featuredLabel={featuredLabel}
          featuredUrl={featuredUrl}
          id={'categories'}
          isOpen={isOpen}
          nav={nav.categories as TaxonomyChildrenItem[]}
          onClose={onClick}
          root={root}
        />
      );

      expect(container.getElementsByClassName('menu'));

      // assert that the component matches the existing snapshot
      // test snapshot against component since container is rendered hidden
      // and doesn't show up in initial container
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is not a properly structured nav property', () => {
    const nav = undefined;

    it('it does not render', () => {
      const isOpen = false;
      const onClick = jest.fn();

      const { container } = render(
        <NavMenu
          id={'categories'}
          isOpen={isOpen}
          nav={nav as unknown as TaxonomyChildrenItem[]}
          onClose={onClick}
          root={root}
        />
      );

      expect(container.getElementsByClassName('menu').length).toEqual(0);
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
      const isOpen = false;
      const onClick = jest.fn();

      const { container } = render(
        <NavMenu
          id={'categories'}
          isOpen={isOpen}
          nav={nav as unknown as TaxonomyChildrenItem[]}
          onClose={onClick}
          root={root}
        />
      );

      expect(container.getElementsByClassName('menu').length).toEqual(0);
    });
  });
});
