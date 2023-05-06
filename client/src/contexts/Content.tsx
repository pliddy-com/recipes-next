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
import { IRecipeChangeSet } from 'types/content';

interface ICMContext {
  canSave: boolean;
  editMode: boolean;
  editLoading: boolean;
  setCanSave: Dispatch<SetStateAction<boolean>>;
  saveRecipe(event: SyntheticEvent): void;
  setRecipe: Dispatch<SetStateAction<IRecipeChangeSet | undefined>>;
  toggleEdit(): void;
}

interface ContentManagementProps {
  children: ReactElement | ReactElement[];
}

const contentApiUrl = process.env.NEXT_PUBLIC_AWS_CONTENT_API;

const ContentManagementContext = createContext<ICMContext>({} as ICMContext);

const ContentManagementProvider = (props: ContentManagementProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IRecipeChangeSet | undefined>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);

  const { isAuth, token } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setEditMode(false);
  }, [isAuth]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const updateEntry = async ({ recipe }: { recipe: IRecipeChangeSet }) => {
    if (!isAuth || !token) {
      throw new Error('User is not authenticated.');
    }

    if (!canSave) {
      throw new Error('Content has not changed.');
    }

    const restApi = `${contentApiUrl}/${recipe.id}`;
    console.log({ recipe });

    try {
      const response = await fetch(restApi, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`
        },
        body: JSON.stringify(recipe)
      });

      return response.json();
    } catch (e) {
      console.error('Could not save changes to the recipe.');
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

      console.log('Recipe Updated => Payload:', res);
    } catch (e) {
      // TODO: handle error in UI
      console.error(e);
    }
  };

  return (
    <ContentManagementContext.Provider
      value={{
        canSave,
        editMode,
        editLoading,
        setCanSave,
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
