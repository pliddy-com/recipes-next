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

import { useRouter } from 'next/router';
import { useAuthContext } from './Authentication';
import { IRecipeChangeSet } from 'types/content';

interface ICMContext {
  canSave: boolean;
  editMode: boolean;
  editLoading: boolean;
  setCanSave: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  saveRecipe(event: SyntheticEvent): void;
  setRecipe: Dispatch<SetStateAction<IRecipeChangeSet | undefined>>;
  supressEdit: boolean;
  setSupressEdit: Dispatch<SetStateAction<boolean>>;
  toggleEdit(): void;
  uploadImage(file: File): void;
}

interface ContentManagementProps {
  children: ReactElement | ReactElement[];
}

const recipeApiUrl = `${process.env.NEXT_PUBLIC_AWS_API}/recipes`;
const assetsApiUrl = `${process.env.NEXT_PUBLIC_AWS_API}/assets`;

const ContentManagementContext = createContext<ICMContext>({} as ICMContext);

const ContentManagementProvider = (props: ContentManagementProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IRecipeChangeSet | undefined>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [supressEdit, setSupressEdit] = useState<boolean>(false);

  const { isAuth, token } = useAuthContext();
  const { asPath, push } = useRouter();

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

    const restApi = `${recipeApiUrl}/${recipe.id}`;

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

    if (recipe) {
      try {
        recipe && (await updateEntry({ recipe }));

        const page = asPath.split('/').slice(-1)[0];
        if (recipe && page !== recipe.slug) push('/');

        setEditMode(false);
        setEditLoading(false);
      } catch (e) {
        // TODO: handle error in UI
        console.error(e);
      }
    } else {
      const err = new Error('No recipe payload to save.');
      throw err;
    }
  };

  // upload media asset to Contentful

  // MOVE TO AWS API
  // UPLOAD IMAGE TO S3 USING SECURE URL
  // SEND SECURE DOWNLOAD URL TO CONTENTFUL WITH CREATE ASSET REQUEST

  const bufferToText = (buffer: ArrayBufferLike) => {
    const bufferByteLength = buffer.byteLength;
    const bufferUint8Array = new Uint8Array(buffer, 0, bufferByteLength);

    return new TextDecoder().decode(bufferUint8Array);
  };

  const uploadImage = async (file: File) => {
    try {
      if (!isAuth || !token) {
        throw new Error('User is not authenticated.');
      }

      console.log({ file });

      // const { name, type } = file;

      const buffer = await file.arrayBuffer();
      const body = bufferToText(buffer);

      console.log('body', body);

      try {
        const response = await fetch(assetsApiUrl, {
          method: 'POST',
          headers: {
            Authorization: `${token}`
          },
          body: JSON.stringify(body)
        });

        return response.json();
      } catch (e) {
        console.error('Could not upload the image.');
      }

      // const upload =
      //   buffer &&
      //   (await client
      //     .getSpace(SPACE_ID)
      //     .then((space) => space.getEnvironment('master'))
      //     .then((environment) =>
      //       environment.createAssetFromFiles({
      //         fields: {
      //           title: {
      //             'en-US': name
      //           },
      //           description: {
      //             'en-US': 'Asset description'
      //           },
      //           file: {
      //             'en-US': {
      //               contentType: type,
      //               fileName: name,
      //               file: buffer
      //             }
      //           }
      //         }
      //       })
      //     )
      //     .then((asset) => {
      //       console.log('processing upload');
      //       return asset.processForAllLocales({ processingCheckWait: 2000 });
      //     })
      //     .then((asset) => {
      //       console.log('publishing upload');
      //       return asset.publish();
      //     })
      //     .then((asset) => {
      //       console.log({ asset });
      //       return asset;
      //     }));

      // console.log('Upload ', upload);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ContentManagementContext.Provider
      value={{
        canSave,
        editLoading,
        editMode,
        saveRecipe,
        setCanSave,
        setEditMode,
        setRecipe,
        setSupressEdit,
        supressEdit,
        toggleEdit,
        uploadImage
      }}
    >
      {props.children}
    </ContentManagementContext.Provider>
  );
};

const useContentManagementContext = () => useContext(ContentManagementContext);

export { ContentManagementProvider, useContentManagementContext };
