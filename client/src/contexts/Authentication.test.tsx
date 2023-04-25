import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import {
  AuthenticationProvider,
  useAuthContext
} from 'contexts/Authentication';

jest.genMockFromModule('amazon-cognito-identity-js');
jest.mock('lib/userPool');

describe('Authentication', () => {
  describe('when the provider is called', () => {
    it('the Authentication provider renders', async () => {
      const email = 'test@mail.com';
      const password = 'password';

      const TestingComponent = () => {
        const { signIn, signOut } = useAuthContext();

        return (
          <>
            <p>test</p>
            <button
              onClick={async () => signIn({ email, password })}
              data-testid="signIn"
            >
              signIn
            </button>
            <button onClick={signOut} data-testid="signOut">
              Signout
            </button>
          </>
        );
      };

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
      signInButton && fireEvent.click(signInButton);

      const signOutButton = queryByTestId('signOut');
      signOutButton && fireEvent.click(signOutButton);
    });
  });
});
