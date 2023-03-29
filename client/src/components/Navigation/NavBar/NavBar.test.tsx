// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavBar, { NavDataProps } from './NavBar';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('NavBar', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn() // Deprecated
      }))
    });
  });

  describe('when there is a properly structured nav property', () => {
    it('it renders a nav bar', async () => {
      const nav = await api.getNavTaxonomy();

      const { asFragment, queryByRole, queryByTestId } = render(
        <NavBar nav={nav as NavDataProps} />
      );

      const component = queryByTestId('navbar');

      // assert that component has been rendered
      expect(component).toBeInTheDocument();

      // assert that buttons have been rendered
      const logoButton = queryByRole('button', {
        name: 'home'
      });

      expect(logoButton).toBeDefined();
      // assert that component has correct href
      expect(logoButton).toHaveAttribute('href', '/');

      const searchButton = queryByRole('button', {
        name: 'search'
      });

      expect(searchButton).toBeDefined();
      expect(searchButton).toHaveAttribute('href', '/search');

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no nav property', () => {
    it('it does not render a navbar', () => {
      const nav = undefined;
      const testId = 'navbar';

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
