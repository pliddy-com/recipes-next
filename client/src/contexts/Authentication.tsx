import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import userPool from 'lib/userPool';

interface SignInProps {
  email: string;
  password: string;
}

interface AuthenticationContextValue {
  isAuth: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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

  /* istanbul ignore next */
  useEffect(() => {
    setIsAuth(token ? true : false);
  }, [token]);

  /* istanbul ignore next */
  const signIn = async ({ email, password }: SignInProps) => {
    await new Promise((resolve, reject) => {
      setIsLoading(true);

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
          },
          onFailure: (err) => {
            reject(err);
            setIsLoading(false);
          },
          newPasswordRequired: (data) => {
            resolve(data);
            setIsLoading(false);
          }
        });
    });
  };

  /* istanbul ignore next */
  const signOut = () => {
    const user = userPool && userPool.getCurrentUser();

    user && user.signOut();

    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuth,
        isLoading,
        setIsLoading,
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
