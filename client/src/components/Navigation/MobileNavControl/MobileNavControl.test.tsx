import { render, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import MobileNavControl, { NavDataProps } from './MobileNavControl';

import * as api from 'lib/api';
import * as AuthContext from 'contexts/Authentication';

jest.mock('lib/api');
jest.mock('contexts/Authentication');

describe('NavMenuControl', () => {
  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu hidden by default', async () => {
      const nav = await api.getNavTaxonomy();
      const contextValues = {
        isAuth: false,
        signIn: jest.fn(),
        getSession: jest.fn(),
        signOut: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const { asFragment, queryByRole, queryByTestId } = render(
        <MobileNavControl
          ariaLabel="open test menu"
          nav={nav as NavDataProps}
        />
      );

      expect(authSpy).toBeCalled();

      const testButton = queryByRole('button', {
        name: 'open test menu'
      });

      // assert that callback is called on click & there was a change in the DOM
      testButton && fireEvent.click(testButton);

      const openMenu = queryByTestId('mobile-nav');

      waitFor(() => expect(openMenu).toBeVisible());

      openMenu &&
        fireEvent.keyDown(openMenu, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27
        });

      waitFor(() => expect(openMenu).not.toBeVisible());

      expect(asFragment()).toMatchSnapshot();
    });

    it('renders a sign in button when authenticated', async () => {
      const nav = await api.getNavTaxonomy();
      const expectedLabel = 'Sign Out';

      const contextValues = {
        isAuth: true,
        signIn: jest.fn(),
        getSession: jest.fn(),
        signOut: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const { asFragment, queryByRole, queryByTestId } = render(
        <MobileNavControl
          ariaLabel="open test menu"
          nav={nav as NavDataProps}
        />
      );

      expect(authSpy).toBeCalled();

      const testButton = queryByRole('button', {
        name: 'open test menu'
      });

      // assert that callback is called on click & there was a change in the DOM
      testButton && fireEvent.click(testButton);

      const openMenu = queryByTestId('mobile-nav');

      waitFor(() => expect(openMenu).toBeVisible());

      // assert that the component has been rendered
      const component = queryByRole('button', { name: 'sign out' });

      // assert that the component has correct label
      expect(component && component.textContent).toContain(expectedLabel);

      const closeButton = queryByRole('button', {
        name: 'sign out'
      });

      // assert that callback is called on click & there was a change in the DOM
      closeButton && fireEvent.click(closeButton);

      waitFor(() => expect(openMenu).Not.toBeVisible());

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
