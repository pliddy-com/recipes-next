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

import { useAuthContext } from './Authentication';
import { IFormState } from 'types/content';

interface ICMContext {
  editMode: boolean;
  editLoading: boolean;
  saveRecipe(event: SyntheticEvent): void;
  setRecipe: Dispatch<SetStateAction<IFormState | undefined>>;
  toggleEdit(): void;
}

const ContentManagementContext = createContext<ICMContext>({} as ICMContext);

interface ContentManagementProps {
  children: ReactElement | ReactElement[];
}

const ContentManagementProvider = (props: ContentManagementProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IFormState | undefined>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  //   const [token, setToken] = useState<string | null>();

  const { isAuth, token } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setEditMode(false);
  }, [isAuth]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const updateEntry = async ({ recipe }: { recipe: IFormState }) => {
    if (!isAuth || !token) {
      throw new Error('User is not authenticated');
    }

    // TODO: add { id } to resource path

    const restApi = `https://uh4gk35zie.execute-api.us-east-1.amazonaws.com/test/recipes/${recipe.id}`;

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
    setEditLoading(true);
    event.preventDefault();

    if (!isAuth || !token) {
      throw new Error('User is not authenticated');
    }

    try {
      const res = recipe && (await updateEntry({ recipe }));

      setEditMode(false);
      setEditLoading(false);

      console.log(JSON.parse(res));
    } catch (e) {
      // TODO: handle error in UI
      console.error(e);
    }
  };

  return (
    <ContentManagementContext.Provider
      value={{
        editMode,
        editLoading,
        saveRecipe,
        setRecipe,
        toggleEdit
      }}
    >
      {props.children}
    </ContentManagementContext.Provider>
  );
};

const useContentManagementContext = () => useContext(ContentManagementContext);

export { ContentManagementProvider, useContentManagementContext };
