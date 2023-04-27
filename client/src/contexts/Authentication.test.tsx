import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import {
  AuthenticationProvider,
  useAuthContext
} from 'contexts/Authentication';

jest.mock('amazon-cognito-identity-js');

describe('Authentication', () => {
  const email = 'test@mail.com';
  const password = 'password';

  const TestingComponent = () => {
    const { signIn, getToken, signOut } = useAuthContext();

    return (
      <>
        <button onClick={getToken} data-testid="getToken">
          Get Token
        </button>

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

  afterAll(() => {
    jest.resetModules();
  });

  describe('when the provider is called', () => {
    it('the Authentication provider renders', async () => {
      const { queryByTestId } = render(
        <AuthenticationProvider>
          <TestingComponent />
        </AuthenticationProvider>
      );

      // wait for dynamic component to load
      await act(async () => {
        waitFor(() => expect(queryByTestId('getToken')).toBeInTheDocument());
        waitFor(() => expect(queryByTestId('signIn')).toBeInTheDocument());
        waitFor(() => expect(queryByTestId('signOut')).toBeInTheDocument());
      });

      const getTokenButton = queryByTestId('getToken');
      getTokenButton && fireEvent.click(getTokenButton);

      // fire second click to generate error
      getTokenButton && fireEvent.click(getTokenButton);

      const signInButton = queryByTestId('signIn');
      signInButton && (await fireEvent.click(signInButton));

      const signOutButton = queryByTestId('signOut');
      signOutButton && fireEvent.click(signOutButton);
    });
  });

  // describe('when getSession returns and error', () => {
  //   // this test calls the second instance of mock getSession, which returns an error
  //   // except it doesn't work on GitHub Actions
  //   it('getToken returns null', async () => {
  //     const session = {
  //       getIdToken: jest.fn().mockReturnValue({
  //         getJwtToken: jest.fn().mockReturnValue('TOKEN')
  //       })
  //     };

  //     const user = {
  //       getSession: jest
  //         .fn()
  //         .mockImplementationOnce((cb) => cb(new Error('SESSION_ERROR'), null)),
  //       signOut: jest.fn()
  //     };

  //     jest

  //     const { queryByTestId } = render(
  //       <AuthenticationProvider>
  //         <TestingComponent />
  //       </AuthenticationProvider>
  //     );

  //     await act(async () => {
  //       waitFor(() => expect(queryByTestId('getToken')).toBeInTheDocument());
  //     });

  //     const getTokenButton = queryByTestId('getToken');
  //     getTokenButton && fireEvent.click(getTokenButton);
  //   });
  // });
});
