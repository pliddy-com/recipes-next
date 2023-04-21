/* istanbul ignore file */

import {
  ReactElement,
  createContext,
  useCallback,
  // useEffect,
  useState
} from 'react';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

import userPool from 'lib/userPool';
// import Router from 'next/router';

interface SignInProps {
  email: string;
  password: string;
}

interface AuthenticationContextValue {
  isAuth: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  getSession(): Promise<void>;
  signOut(): void;
}

const defaultContext = {
  isAuth: false,
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

const AuthenticationProvider = (props: AuthenticationProps) => {
  const [isAuth, setIsAuth] = useState(false);

  const getSession = useCallback(async () => {
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            setIsAuth(false);
            reject(err);
          } else {
            setIsAuth(true);
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  }, []);

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
          setIsAuth(true);
          resolve(result);
        },
        onFailure: (err) => {
          setIsAuth(false);
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
    setIsAuth(false);
    // Router.reload();
  };

  // useEffect(() => {
  //   getSession()
  //     .then((session) => {
  //       console.log('Session: ', session);
  //       setIsAuth(true);
  //     })
  //     .catch((err) => {
  //       console.log('Session: ', err);
  //       setIsAuth(false);
  //     });
  // }, [getSession]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuth, signIn, getSession, signOut }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticationContext };
