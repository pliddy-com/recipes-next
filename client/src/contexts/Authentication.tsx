/* istanbul ignore file */

import { ReactElement, createContext } from 'react';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

import userPool from 'lib/userPool';

const AccountContext = createContext({});

interface AccountProps {
  children: ReactElement | ReactElement[];
}

interface AuthenticateProps {
  email: string;
  password: string;
}

const Account = (props: AccountProps) => {
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

  const authenticate = async ({ email, password }: AuthenticateProps) => {
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
          console.log('login success', result);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        }
      });
    });
  };

  const logout = () => {
    const user = userPool.getCurrentUser();
    user && user.signOut();
    window.location.href = '/';
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
