/* istanbul ignore file */

import { ReactElement, createContext } from 'react';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

import userPool from 'lib/userPool';

interface SignInProps {
  email: string;
  password: string;
}

interface AuthenticationContextValue {
  signIn({ email, password }: SignInProps): Promise<void>;
  getSession(): Promise<void>;
  signOut(): void;
}

const defaultContext = {
  signIn: () => Promise<void>,
  getSession: () => Promise<void>,
  signOut: () => {
    null;
  }
};

const AuthenticationContext = createContext<AuthenticationContextValue>(
  defaultContext as unknown as AuthenticationContextValue
);

interface AuthenticationProps {
  children: ReactElement | ReactElement[];
}

const Authentication = (props: AuthenticationProps) => {
  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const signIn = async ({ email, password }: SignInProps) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          // console.log('login success', result);
          resolve(result);
        },
        onFailure: (err) => {
          // console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          // console.log('new password required', data);
          resolve(data);
        }
      });
    });
  };

  const signOut = () => {
    const user = userPool.getCurrentUser();
    user && user.signOut();
    window.location.reload();
  };

  return (
    <AuthenticationContext.Provider value={{ signIn, getSession, signOut }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { Authentication, AuthenticationContext };
