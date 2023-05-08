/* istanbul ignore file */
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

// import { IRecipeChangeSet } from 'components/Recipe/RecipeEdit';

import userPool from 'lib/userPool';

interface SignInProps {
  email: string;
  password: string;
}

interface IAuthenticationContext {
  isAuth: boolean;
  authLoading: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  signOut(): void;
  token: string | null | undefined;
}

const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

interface AuthenticationProps {
  children: ReactElement | ReactElement[];
}

const AuthenticationProvider = (props: AuthenticationProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>();
  const [authLoading, setAuthIsLoading] = useState<boolean>(false);

  const getToken = async () => {
    const user = userPool && userPool.getCurrentUser();

    user &&
      user.getSession((err: Error | null, session: CognitoUserSession) => {
        /* NOTE: this works locally, but fails coverage on github actions */
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
    setAuthIsLoading(true);

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

      /* NOTE: this works locally, but fails coverage on github actions */
      user &&
        user.authenticateUser(authDetails, {
          onSuccess: (result) => {
            setToken(result.getIdToken().getJwtToken());
            resolve(result);
            setAuthIsLoading(false);
          },
          onFailure: (err) => {
            reject(err);
            setAuthIsLoading(false);
          }
        });
    });

    setAuthIsLoading(false);
  };

  const signOut = () => {
    const user = userPool && userPool.getCurrentUser();

    user && user.signOut();

    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        token,
        isAuth,
        authLoading,
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
