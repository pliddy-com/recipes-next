import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import SignInButton from './SignInButton';

import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication');

describe('SignInButton', () => {
  it('renders a sign in button when not authenticated', () => {
    const expectedHref = '/signin';
    const expectedLabel = 'Sign In';

    const contextValues = {
      isAuth: false,
      isLoading: false,
      setIsLoading: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn()
    };

    const authSpy = jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => contextValues);

    const { asFragment, getByRole } = render(<SignInButton />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const signInButton = getByRole('button', { name: 'sign in' });

    // assert that the component has correct label
    expect(signInButton.textContent).toContain(expectedLabel);

    // assert that the component has correct href
    expect(signInButton).toHaveAttribute('href', expectedHref);

    signInButton && fireEvent.click(signInButton);

    // assert that the component matches the existing snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a sign in menu button when not authenticated', () => {
    const expectedHref = '/signin';
    const expectedLabel = 'Sign In';

    const contextValues = {
      isAuth: false,
      isLoading: false,
      setIsLoading: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn()
    };

    const authSpy = jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => contextValues);

    const { asFragment, getByRole } = render(<SignInButton style="menu" />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const component = getByRole('link', { name: 'sign in' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component has correct href
    expect(component).toHaveAttribute('href', expectedHref);

    // assert that the component matches the existing snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a sign in button when authenticated', () => {
    const expectedLabel = 'Sign Out';

    const contextValues = {
      isAuth: true,
      isLoading: false,
      setIsLoading: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn()
    };

    const authSpy = jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => contextValues);

    const { getByRole } = render(<SignInButton />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const component = getByRole('button', { name: 'sign out' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });

  it('renders a sign in menu button when authenticated', () => {
    const expectedLabel = 'Sign Out';

    const contextValues = {
      isAuth: true,
      isLoading: false,
      setIsLoading: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn()
    };

    const authSpy = jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => contextValues);

    const { getByRole } = render(<SignInButton style="menu" />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const component = getByRole('button', { name: 'sign out' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
