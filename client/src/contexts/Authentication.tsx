import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
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
  getToken(): Promise<null>;
  isAuth: boolean;
  isLoading: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  signOut(): void;
}

const AuthenticationContext = createContext<AuthenticationContextValue>(
  {} as AuthenticationContextValue
);

interface AuthenticationProps {
  children: ReactElement | ReactElement[];
}

const AuthenticationProvider = (props: AuthenticationProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getToken = async () => {
    const user = userPool && userPool.getCurrentUser();

    user &&
      user.getSession((err: Error | null, session: CognitoUserSession) => {
        if (err) {
          return null;
        }
        setToken(session.getIdToken().getJwtToken());
      });

    return null;
  };

  useEffect(() => {
    getToken();
    setIsAuth(token ? true : false);
  }, [token]);

  const signIn = async ({ email, password }: SignInProps) => {
    setIsLoading(true);
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
            setToken(result.getIdToken().getJwtToken());
            resolve(result);
            setIsLoading(false);
          },
          onFailure: (err) => {
            reject(err);
            setIsLoading(false);
          }
          // newPasswordRequired: (data) => {
          //   resolve(data);
          //   setIsLoading(false);
          // }
        });
    });
    setIsLoading(false);
  };

  const signOut = () => {
    const user = userPool && userPool.getCurrentUser();

    user && user.signOut();

    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        getToken,
        isAuth,
        isLoading,
        signIn,
        signOut
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuthContext };
