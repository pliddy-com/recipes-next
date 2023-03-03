// import testing-library methods
import { render, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavBar, { NavDataProps } from './NavBar';

// import { TaxonomyChildrenItem } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('NavBar', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        // onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        // addEventListener: jest.fn(),
        // removeEventListener: jest.fn(),
        // dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('when there is a properly structured nav property', () => {
    it('it renders a nav bar', async () => {
      const nav = await api.getNavTaxonomy();

      const { container, queryByRole } = render(
        <NavBar nav={nav as NavDataProps} />
      );
      const component = container.getElementsByClassName('MuiAppBar-root')[0];

      // assert that component has been rendered
      expect(component).toBeInTheDocument();

      // assert that buttons have been rendered
      const logoButton = queryByRole('button', {
        name: 'home',
      });

      expect(logoButton).toBeDefined();

      const categoriesButton = queryByRole('button', {
        name: 'open categories menu',
      });

      const cuisineButton = queryByRole('button', {
        name: 'open cuisine menu',
      });

      const tagsButton = queryByRole('button', {
        name: 'open tags menu',
      });

      // assert that callback is called on click & there was a change in the DOM
      categoriesButton && fireEvent.click(categoriesButton);

      const categoriesDrawer = queryByRole('menu', {
        name: 'categories menu',
      });

      waitFor(() => expect(categoriesDrawer).toBeVisible());

      categoriesDrawer &&
        fireEvent.keyDown(categoriesDrawer, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27,
        });

      waitFor(() => expect(categoriesDrawer).not.toBeVisible());

      // assert that callback is called on click & there was a change in the DOM
      cuisineButton && fireEvent.click(cuisineButton);

      const cuisineDrawer = queryByRole('menu', {
        name: 'cuisine menu',
      });

      waitFor(() => expect(cuisineDrawer).toBeVisible());

      cuisineDrawer &&
        fireEvent.keyDown(cuisineDrawer, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27,
        });

      waitFor(() => expect(cuisineDrawer).not.toBeVisible());

      // assert that callback is called on click & there was a change in the DOM
      tagsButton && fireEvent.click(tagsButton);

      const tagsDrawer = queryByRole('menu', {
        name: 'tags menu',
      });

      waitFor(() => expect(tagsDrawer).toBeVisible());

      tagsDrawer &&
        fireEvent.keyDown(tagsDrawer, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27,
        });

      waitFor(() => expect(tagsDrawer).not.toBeVisible());

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no nav property', () => {
    it('it does not render a navbar', () => {
      const nav = undefined;
      const testId = 'nav-menu';
      const { queryByTestId, queryByRole } = render(<NavBar nav={nav} />);

      // assert that there is no NavMenu
      const menu = queryByTestId(testId);
      expect(menu).toBeNull();

      // assert that there is no menu button
      const button = queryByRole('button', { name: 'open drawer' });
      expect(button).toBeNull();
    });
  });
});
