import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import SignInControl from './SignInControl';

import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication');

describe('SignInControl', () => {
  it('renders a sign in button when not authenticated', async () => {
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

    const { asFragment, getByRole, queryByTestId } = render(<SignInControl />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const signInButton = getByRole('button', { name: 'sign in' });

    // assert that the component has correct label
    expect(signInButton.textContent).toContain(expectedLabel);

    signInButton && fireEvent.click(signInButton);

    // wait for dynamic component to load
    await act(async () =>
      waitFor(() => expect(queryByTestId('signInDialog')).toBeInTheDocument())
    );

    // click cancel button to trigger onClose
    const cancelButton = getByRole('button', { name: 'cancel' });

    expect(cancelButton).toBeInTheDocument();
    cancelButton && fireEvent.click(cancelButton);

    // assert that the component matches the existing snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a sign out button when authenticated', () => {
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
      .mockImplementationOnce(() => contextValues);

    const { getByRole } = render(<SignInControl />);

    expect(authSpy).toBeCalled();

    // assert that the component has been rendered
    const component = getByRole('button', { name: 'sign out' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
