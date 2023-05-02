// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import NavBar, { NavDataProps } from './NavBar';

import * as api from 'lib/api';
import * as AuthContext from 'contexts/Authentication';

jest.mock('lib/api');
jest.mock('contexts/Authentication');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '/recipes/',
    push: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn()
    }
  })
}));

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
      const contextValues = {
        editMode: false,
        getToken: jest.fn(),
        isAuth: false,
        isLoading: false,
        signIn: jest.fn(),
        signOut: jest.fn(),
        toggleEdit: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const nav = await api.getNavTaxonomy();

      const { asFragment, queryByRole, queryByTestId } = render(
        <NavBar nav={nav as NavDataProps} />
      );

      expect(authSpy).toBeCalled();

      const navBar = queryByTestId('navbar');

      // assert that component has been rendered
      expect(navBar).toBeInTheDocument();

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
    it('it does not render nav items', () => {
      const { queryByRole } = render(<NavBar nav={undefined} />);

      // assert that there is no NavMenu
      const mobileNav = queryByRole('button', { name: 'open navigation menu' });
      expect(mobileNav).toBeNull();

      const desktopNav = queryByRole('button', {
        name: 'open categories menu'
      });
      expect(desktopNav).toBeNull();
    });
  });

  describe('when isAuth is true', () => {
    it('it shows the user toolbar', async () => {
      const contextValues = {
        editMode: false,
        getToken: jest.fn(),
        isAuth: true,
        isLoading: false,
        signIn: jest.fn(),
        signOut: jest.fn(),
        toggleEdit: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const nav = await api.getNavTaxonomy();

      const { asFragment } = render(<NavBar nav={nav as NavDataProps} />);

      expect(authSpy).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when editMode is true', () => {
    it('it shows the cancel button', async () => {
      const contextValues = {
        editMode: true,
        getToken: jest.fn(),
        isAuth: true,
        isLoading: false,
        signIn: jest.fn(),
        signOut: jest.fn(),
        toggleEdit: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const nav = await api.getNavTaxonomy();

      const { asFragment } = render(<NavBar nav={nav as NavDataProps} />);

      expect(authSpy).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
