import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  AuthenticationProvider,
  useAuthContext
} from 'contexts/Authentication';

// import * as Cognito from 'amazon-cognito-identity-js';

// jest.mock('amazon-cognito-identity-js', () => ({
//   CognitoUser: jest.fn().mockImplementation(),
//   AuthenticationDetails: jest.fn().mockImplementation()
// }));

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

      render(
        <AuthenticationProvider>
          <TestingComponent />
        </AuthenticationProvider>
      );

      // wait for dynamic component to load
      //   await act(async () =>
      //     waitFor(() => expect(queryByTestId('signOut')).toBeInTheDocument())
      //   );

      //   try {
      //     const signOutButton = await queryByTestId('signOut');
      //     // assert that callback is called on click
      //     signOutButton && fireEvent.click(signOutButton);
      //   } catch (e) {
      //     console.error(e);
      //   }
    });
  });
});
