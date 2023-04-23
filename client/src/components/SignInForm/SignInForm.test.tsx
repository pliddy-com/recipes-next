import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import SignInForm from './SignInForm';

import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe('SignInForm', () => {
  describe('when isAuth is false', () => {
    it('it renders a sign in form', () => {
      const contextValues = {
        getSession: jest.fn(),
        isAuth: false,
        signIn: jest.fn(),
        signOut: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementationOnce(() => contextValues);

      const { asFragment } = render(<SignInForm />);

      expect(authSpy).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when isAuth is true', () => {
    it('it renders a sign in form', () => {
      const contextValues = {
        getSession: jest.fn(),
        isAuth: true,
        signIn: jest.fn(),
        signOut: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementationOnce(() => contextValues);

      const { asFragment } = render(<SignInForm />);

      expect(authSpy).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
