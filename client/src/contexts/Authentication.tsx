import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';

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
  isAuth: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  getSession(): Promise<CognitoUserSession | null | void>;
  signOut(): void;
}

const AuthenticationContext = createContext<AuthenticationContextValue>(
  {} as AuthenticationContextValue
);

interface AuthenticationProps {
  children: ReactElement | ReactElement[];
}

const AuthenticationProvider = (props: AuthenticationProps) => {
  const [isAuth, setIsAuth] = useState(false);

  /* istanbul ignore next */
  const getSession = useCallback(async () => {
    await new Promise((resolve, reject) => {
      const user = userPool && userPool.getCurrentUser();

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

  /* istanbul ignore next */
  const signIn = async ({ email, password }: SignInProps) => {
    await new Promise((resolve, reject) => {
      const user =
        userPool &&
        new CognitoUser({
          Username: email,
          Pool: userPool
        });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      user &&
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
            resolve(data);
          }
        });
    });
  };

  /* istanbul ignore next */
  const signOut = () => {
    const user = userPool && userPool.getCurrentUser();
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
      value={{
        isAuth,
        signIn,
        getSession,
        signOut
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuthContext };
