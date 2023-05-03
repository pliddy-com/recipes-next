import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import SignInDialog from './SignInDialog';

import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn()
    }
  })
}));

describe('SignInDialog', () => {
  describe('when isAuth is false', () => {
    it('it renders a sign in form', async () => {
      const emailValue = 'test@mail.com';
      const passwordValue = 'password';

      const { asFragment, queryByTestId, queryByLabelText, queryByRole } =
        render(
          <SignInDialog
            isLoading={false}
            onSignIn={jest.fn()}
            isOpen={true}
            onClose={jest.fn()}
          />
        );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('signInDialog')).toBeInTheDocument())
      );

      // expect(authSpy).toBeCalled();

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

      waitFor(() => submitButton && fireEvent.click(submitButton));

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
        editMode: false,
        getToken: jest.fn(),
        isAuth: false,
        isLoading: false,
        saveRecipe: jest.fn(),
        setRecipe: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn(),
        toggleEdit: jest.fn()
      };

      jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const { queryByTestId, queryByLabelText, queryByRole } = render(
        <SignInDialog
          isLoading={false}
          onSignIn={jest.fn().mockRejectedValueOnce('error')}
          isOpen={true}
          onClose={jest.fn()}
        />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('signInDialog')).toBeInTheDocument())
      );

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

  describe('when isLoading is true', () => {
    it('it renders a Loading indicator', async () => {
      const { asFragment, queryByTestId, queryByRole } = render(
        <SignInDialog
          isLoading={true}
          onSignIn={jest.fn()}
          isOpen={true}
          onClose={jest.fn()}
        />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('signInDialog')).toBeInTheDocument())
      );

      const component = queryByRole('graphics-symbol', {
        name: 'spinner'
      });
      expect(component).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
