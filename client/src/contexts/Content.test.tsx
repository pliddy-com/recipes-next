import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import {
  ContentManagementProvider,
  useContentManagementContext
} from 'contexts/Content';

import { IRecipeChangeSet } from 'types/content';
import * as AuthContext from 'contexts/Authentication';

jest.mock('contexts/Authentication');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ value: 'test' })
  })
) as jest.Mock;

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '/tag/path',
    pathname: '/path',
    push: jest.fn(),
    route: '/route'
  })
}));

describe('Content', () => {
  afterEach(() => {
    jest.resetModules();
  });
  const TestingComponent = () => {
    const {
      setCanSave,
      setEditMode,
      saveRecipe,
      setRecipe,
      setSupressEdit,
      toggleEdit
    } = useContentManagementContext();

    const recipeChanges: IRecipeChangeSet = {
      abstract: 'abstract',
      cookTime: '30',
      equipment: ['equipment'],
      id: 'id',
      image: {
        sys: {
          id: 'img-id'
        },
        title: 'Placeholder',
        description: 'Image description.',
        contentType: 'image/png',
        fileName: 'placeholder.png',
        size: 33142,
        url: 'https://images.url',
        height: 1350,
        width: 1800,
        __typename: 'Asset'
      },
      ingredientsList: [
        {
          sectionTitle: 'Ingredients',
          sectionItems: ['ingredient 1', 'ingredient2']
        }
      ],
      instructionsList: [
        {
          sectionTitle: 'Instructions',
          sectionItems: ['instruction 1', 'instruction ']
        }
      ],
      keywords: [],
      notes: [],
      prepTime: '15',
      recipeYield: '4',
      slug: 'slug',
      tags: [],
      title: 'Title'
    };
    return (
      <>
        <button onClick={async () => setCanSave(true)} data-testid="setCanSave">
          Set Can Save
        </button>

        <button
          onClick={async () => setEditMode(true)}
          data-testid="setEditMode"
        >
          Set Edit Mode
        </button>

        <button onClick={async (e) => saveRecipe(e)} data-testid="saveRecipe">
          Save Recipe
        </button>

        <button
          onClick={async () => setRecipe(recipeChanges)}
          data-testid="setRecipe"
        >
          Set Recipe
        </button>

        <button
          onClick={async () => setSupressEdit(false)}
          data-testid="setSupressEdit"
        >
          Set Supress Edit
        </button>

        <button onClick={async () => toggleEdit()} data-testid="toggleEdit">
          Set ToggleEdit
        </button>
      </>
    );
  };
  describe('when the provider is called', () => {
    it('the Content Management provider renders', async () => {
      const testAuth = { ...AuthContext.useAuthContext(), isAuth: true };

      jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => testAuth);

      const { queryByTestId } = render(
        <ContentManagementProvider>
          <TestingComponent />
        </ContentManagementProvider>
      );

      // wait for dynamic components to load
      waitFor(() => expect(queryByTestId('setCanSave')).toBeInTheDocument());
      waitFor(() => expect(queryByTestId('setEditMode')).toBeInTheDocument());
      waitFor(() => expect(queryByTestId('saveRecipe')).toBeInTheDocument());
      waitFor(() => expect(queryByTestId('setRecipe')).toBeInTheDocument());
      waitFor(() =>
        expect(queryByTestId('setSupressEdit')).toBeInTheDocument()
      );
      waitFor(() => expect(queryByTestId('toggleEdit')).toBeInTheDocument());

      const setCanSaveButton = queryByTestId('setCanSave');
      setCanSaveButton && (await fireEvent.click(setCanSaveButton));

      // set recipe in state before saving it
      const setRecipeButton = queryByTestId('setRecipe');
      setRecipeButton && (await fireEvent.click(setRecipeButton));

      const saveRecipeButton = queryByTestId('saveRecipe');
      saveRecipeButton &&
        waitFor(async () => fireEvent.click(saveRecipeButton));

      const setEditModeButton = queryByTestId('setEditMode');
      setEditModeButton && (await fireEvent.click(setEditModeButton));

      const setSupressEditButton = queryByTestId('setSupressEdit');
      setSupressEditButton && (await fireEvent.click(setSupressEditButton));

      const toggleEditButton = queryByTestId('toggleEdit');
      toggleEditButton && (await fireEvent.click(toggleEditButton));

      //   saveRecipeButton && (await fireEvent.click(saveRecipeButton));
    });
  });
});
