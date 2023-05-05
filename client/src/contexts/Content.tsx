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
  canSave: boolean;
  editMode: boolean;
  editLoading: boolean;
  setCanSave: Dispatch<SetStateAction<boolean>>;
  saveRecipe(event: SyntheticEvent): void;
  setRecipe: Dispatch<SetStateAction<IFormState | undefined>>;
  toggleEdit(): void;
}

interface ContentManagementProps {
  children: ReactElement | ReactElement[];
}

const contentApiUrl = process.env.NEXT_PUBLIC_AWS_CONTENT_API;

const ContentManagementContext = createContext<ICMContext>({} as ICMContext);

const ContentManagementProvider = (props: ContentManagementProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IFormState | undefined>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);

  const { isAuth, token } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setEditMode(false);
  }, [isAuth]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const updateEntry = async ({ recipe }: { recipe: IFormState }) => {
    if (!isAuth || !token) {
      throw new Error('User is not authenticated.');
    }

    if (!canSave) {
      throw new Error('Content has not changed.');
    }
    // TODO: move api url to env until it can be automated

    const restApi = `${contentApiUrl}/${recipe.id}`;

    try {
      const entry = await fetch(restApi, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`
        },
        body: JSON.stringify(recipe)
      });
      if (entry) return entry.json();
    } catch (e) {
      console.log('Could not save changes to the recipe.');
      // console.error('updateEntry ERROR:', e);
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
