// import testing-library methods
import { render, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavMenuControl from './NavMenuControl';

import { TaxonomyChildrenItem } from 'types/queries';

import * as api from 'lib/api';
import Icon from '@mui/material/Icon';

jest.mock('lib/api');

const TestIcon = () => <Icon />;
const featuredLabel = 'Test Label';
const featuredUrl = 'http://test.url';

describe('NavMenuControl', () => {
  const root = 'category';

  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu hidden by default', async () => {
      const nav = await api.getNavTaxonomy();

      const { asFragment, queryByRole } = render(
        <NavMenuControl
          ariaLabel="open test menu"
          label="Test"
          icon={<TestIcon />}
          data-testid="test-menu"
          featuredLabel={featuredLabel}
          featuredUrl={featuredUrl}
          id={'test'}
          nav={nav.categories as TaxonomyChildrenItem[]}
          root={root}
        />
      );

      const testButton = queryByRole('button', {
        name: 'open test menu'
      });

      // assert that callback is called on click & there was a change in the DOM
      testButton && fireEvent.click(testButton);

      const testMenu = queryByRole('menu', {
        name: 'test menu'
      });

      waitFor(() => expect(testMenu).toBeVisible());

      testMenu &&
        fireEvent.keyDown(testMenu, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27
        });

      waitFor(() => expect(testMenu).not.toBeVisible());

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is not a properly structured nav property', () => {
    const nav = undefined;

    it('it does not render', () => {
      const { container } = render(
        <NavMenuControl
          ariaLabel="open test menu"
          label="Test"
          icon={<TestIcon />}
          data-testid="test-menu"
          featuredLabel={featuredLabel}
          featuredUrl={featuredUrl}
          id={'categories'}
          nav={nav as unknown as TaxonomyChildrenItem[]}
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
      const { container } = render(
        <NavMenuControl
          ariaLabel="open test menu"
          label="Test"
          icon={<TestIcon />}
          data-testid="test-menu"
          featuredLabel={featuredLabel}
          featuredUrl={featuredUrl}
          id={'categories'}
          nav={nav as unknown as TaxonomyChildrenItem[]}
          root={root}
        />
      );

      expect(container.getElementsByClassName('menu').length).toEqual(0);
    });
  });
});
