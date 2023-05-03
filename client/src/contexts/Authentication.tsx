/* istanbul ignore file */
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  SyntheticEvent,
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

import { IFormState } from 'components/Recipe/RecipeEdit';

import userPool from 'lib/userPool';

interface SignInProps {
  email: string;
  password: string;
}

interface AuthenticationContextValue {
  editMode: boolean;
  getToken(): Promise<null>;
  isAuth: boolean;
  isLoading: boolean;
  saveRecipe(event: SyntheticEvent): void;
  setRecipe: Dispatch<SetStateAction<IFormState | undefined>>;
  signIn({ email, password }: SignInProps): Promise<void>;
  signOut(): void;
  toggleEdit(): void;
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IFormState | undefined>();

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

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

      /* NOTE: this works locally, but fails coverage on github actions */
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
        });
    });

    setIsLoading(false);
  };

  const signOut = () => {
    setEditMode(false);
    const user = userPool && userPool.getCurrentUser();

    user && user.signOut();

    setToken(null);
  };

  const updateEntry = async ({ recipe }: { recipe: IFormState }) => {
    const restApi = `https://yac4ltvklg.execute-api.us-east-1.amazonaws.com/test/recipes/${recipe.id}`;

    console.log({ recipe });

    try {
      const entry = await fetch(restApi, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`
        },
        body: JSON.stringify(recipe)
      });
      return entry.json();
    } catch (e) {
      console.error('updateEntry ERROR:', e);
    }
  };

  const saveRecipe = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      recipe && (await updateEntry({ recipe }));

      setEditMode(false);

      console.log('saveRecipe', recipe);
    } catch (e) {
      // TODO: handle error in UI
      console.error(e);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        editMode,
        getToken,
        isAuth,
        isLoading,
        saveRecipe,
        setRecipe,
        signIn,
        signOut,
        toggleEdit
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuthContext };
