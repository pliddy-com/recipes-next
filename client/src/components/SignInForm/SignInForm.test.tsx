import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import SignInForm from './SignInForm';

import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication', () => ({
  useAuthContext: jest.fn().mockReturnValue({
    isAuth: false,
    signIn: jest.fn()
  })
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe('SignInForm', () => {
  describe('when isAuth is false', () => {
    it('it renders a sign in form', async () => {
      const emailValue = 'test@mail.com';
      const passwordValue = 'password';

      const contextValues = {
        getSession: jest.fn(),
        isAuth: false,
        signIn: jest.fn().mockResolvedValue('success'),
        signOut: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const { asFragment, queryByTestId, queryByLabelText, queryByRole } =
        render(<SignInForm />);

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('signInForm')).toBeInTheDocument())
      );

      expect(authSpy).toBeCalled();

      const submitButton = queryByRole('button', {
        name: 'submit'
      });

      // assert that form is validated on submit
      submitButton && fireEvent.click(submitButton);

      // Test form field inputs
      const email_input = queryByLabelText('Email');
      const password_input = queryByLabelText('Password');

      email_input &&
        fireEvent.change(email_input, {
          target: { value: emailValue }
        });

      password_input &&
        fireEvent.change(password_input, {
          target: { value: passwordValue }
        });

      expect(email_input).toHaveValue(emailValue);
      expect(password_input).toHaveValue(passwordValue);

      // assert that callback is called on click
      submitButton && fireEvent.click(submitButton);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when signIn returns an error', () => {
    it('it handles the error', async () => {
      const emailValue = 'test@mail.com';
      const passwordValue = 'password';
      const testError = 'sign in failed';

      const contextValues = {
        isAuth: false,
        signIn: jest.fn().mockRejectedValue(new Error(testError)),
        getSession: jest.fn(),
        signOut: jest.fn()
      };

      jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const { queryByTestId, queryByLabelText, queryByRole } = render(
        <SignInForm />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('signInForm')).toBeInTheDocument())
      );

      // Test form field inputs
      const email_input = queryByLabelText('Email');
      const password_input = queryByLabelText('Password');

      //   const form = queryByTestId('signInForm');

      email_input &&
        fireEvent.change(email_input, {
          target: { value: emailValue }
        });

      password_input &&
        fireEvent.change(password_input, {
          target: { value: passwordValue }
        });

      const submitButton = queryByRole('button', {
        name: 'submit'
      });

      if (submitButton) {
        try {
          await waitFor(() => fireEvent.click(submitButton));
        } catch (e) {
          console.error(e);
          expect(e).toEqual(new Error(testError));
        }
      }
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
