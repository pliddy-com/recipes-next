import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react';

import {
  AuthenticationProvider,
  useAuthContext
} from 'contexts/Authentication';

jest.mock('amazon-cognito-identity-js');

describe('Authentication', () => {
  const email = 'test@mail.com';
  const password = 'password';

  const TestingComponent = () => {
    const { signIn, signOut } = useAuthContext();

    return (
      <>
        <button
          onClick={async () => signIn({ email, password })}
          data-testid="signIn"
        >
          Sign In
        </button>

        <button onClick={signOut} data-testid="signOut">
          Sign Out
        </button>
      </>
    );
  };

  describe('when the provider is called', () => {
    it('the Authentication provider renders', async () => {
      const { queryByTestId } = render(
        <AuthenticationProvider>
          <TestingComponent />
        </AuthenticationProvider>
      );

      // wait for dynamic component to load
      await act(async () => {
        waitFor(() => expect(queryByTestId('signIn')).toBeInTheDocument());
        waitFor(() => expect(queryByTestId('signOut')).toBeInTheDocument());
      });

      const signInButton = queryByTestId('signIn');
      signInButton && (await fireEvent.click(signInButton));

      const signOutButton = queryByTestId('signOut');
      signOutButton && fireEvent.click(signOutButton);
    });
  });
});
