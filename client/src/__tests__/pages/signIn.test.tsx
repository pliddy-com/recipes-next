import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import SignInPage from 'pages/signin';
import config from 'lib/config';

jest.mock('lib/config');
jest.mock('components/SignInForm/SignInForm');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe('SignInPage in signIn.tsx', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is content', () => {
    it('it renders the signin page', async () => {
      const { asFragment, queryByTestId } = render(
        // <AuthenticationProvider>
        <SignInPage />
        // </AuthenticationProvider>
      );

      // wait for dynamic component to load
      await act(async () => waitFor(() => queryByTestId('page')));

      //   expect(routerSpy).toBeCalled();

      // wait for dynamic component to load
      await act(async () => waitFor(() => queryByTestId('signInForm')));

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', async () => {
      const { queryByTestId } = render(<SignInPage />);

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeNull())
      );
    });
  });
});
