// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeEdit from './RecipeEdit';

import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';
import * as AuthContext from 'contexts/Authentication';

jest.mock('lib/api');
jest.mock('contexts/Authentication');

const contextValues = {
  editMode: false,
  getToken: jest.fn(),
  isAuth: false,
  isLoading: false,
  saveRecipe: jest.fn(),
  setRecipe: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  toggleEdit: jest.fn()
};

jest
  .spyOn(AuthContext, 'useAuthContext')
  .mockImplementation(() => contextValues);

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', async () => {
      const titleValue = 'TITLE';
      const slugValue = 'SLUG';
      const abstractValue = 'ABSTRACT';
      const prepTimeValue = '15';
      const cookTimeValue = '30';
      const recipeYieldValue = '10';

      const content = await api.getRecipePage();

      const { asFragment, queryByLabelText, queryByTestId } = render(
        <RecipeEdit content={content as unknown as RecipeDefaultFragment} />
      );

      // assert that content is rendered
      expect(queryByTestId('RecipeEdit')).toBeInTheDocument();

      // Test form field inputs
      const titleInput = queryByLabelText('Title');
      titleInput &&
        fireEvent.change(titleInput, {
          target: { value: titleValue }
        });
      expect(titleInput).toHaveValue(titleValue);

      const slugInput = queryByLabelText('Slug');
      slugInput &&
        fireEvent.change(slugInput, {
          target: { value: slugValue }
        });
      expect(slugInput).toHaveValue(slugValue);

      const abstractInput = queryByLabelText('Abstract');
      abstractInput &&
        fireEvent.change(abstractInput, {
          target: { value: abstractValue }
        });
      expect(abstractInput).toHaveValue(abstractValue);

      const prepTimeInput = queryByLabelText('Prep Time');
      prepTimeInput &&
        fireEvent.change(prepTimeInput, {
          target: { value: prepTimeValue }
        });
      expect(prepTimeInput).toHaveValue(prepTimeValue);

      const cookTimeInput = queryByLabelText('Cook Time');
      cookTimeInput &&
        fireEvent.change(cookTimeInput, {
          target: { value: cookTimeValue }
        });
      expect(cookTimeInput).toHaveValue(cookTimeValue);

      const recipeYieldInput = queryByLabelText('Recipe Yield');
      recipeYieldInput &&
        fireEvent.change(recipeYieldInput, {
          target: { value: recipeYieldValue }
        });
      expect(recipeYieldInput).toHaveValue(recipeYieldValue);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the Recipe', () => {
      const content = undefined;

      // test if content is not rendered
      const { queryByTestId } = render(<RecipeEdit content={content} />);

      const recipe = queryByTestId('RecipeEdit');
      expect(recipe).toBeNull();
    });
  });
});
