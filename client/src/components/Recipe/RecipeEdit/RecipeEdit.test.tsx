// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeEdit from './RecipeEdit';

import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';
import * as AuthContext from 'contexts/Authentication';
import * as ContentManagementContext from 'contexts/Content';

jest.mock('lib/api');
jest.mock('contexts/Authentication');
jest.mock('contexts/Content');

const authContextValues = {
  authLoading: false,
  isAuth: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
  token: 'TOKEN'
};

const cmContextValues = {
  canSave: false,
  editMode: false,
  editLoading: false,
  setCanSave: jest.fn(),
  saveRecipe: jest.fn(),
  setRecipe: jest.fn(),
  setSupressEdit: jest.fn(),
  supressEdit: false,
  toggleEdit: jest.fn()
};

jest
  .spyOn(AuthContext, 'useAuthContext')
  .mockImplementation(() => authContextValues);

jest
  .spyOn(ContentManagementContext, 'useContentManagementContext')
  .mockImplementation(() => cmContextValues);

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', async () => {
      const titleValue = 'TITLE';
      // const slugValue = 'title';
      const abstractValue = 'ABSTRACT';
      const prepTimeValue = '30';
      const cookTimeValue = '30';
      const recipeYieldValue = '10';
      // const equipmentValue = 'test_equipment';
      // const keywordsValue = 'test_keyword';

      const { recipe } = await api.getRecipePage();

      const { asFragment, queryByLabelText, queryByTestId } = render(
        <RecipeEdit content={recipe} />
      );

      // assert that content is rendered
      expect(queryByTestId('RecipeEdit')).toBeInTheDocument();

      // check code for toggling Save enabled

      const recipeYieldInput = queryByLabelText('Recipe Yield');
      recipeYieldInput &&
        fireEvent.change(recipeYieldInput, {
          target: { value: recipeYieldValue }
        });
      expect(recipeYieldInput).toHaveValue(recipeYieldValue);

      recipeYieldInput &&
        fireEvent.change(recipeYieldInput, {
          target: { value: '4' }
        });
      expect(recipeYieldInput).toHaveValue('4');

      // Test form field inputs
      const titleInput = queryByLabelText('Title');

      // check code for toggling Save enabled
      titleInput &&
        fireEvent.change(titleInput, { target: { value: titleValue } });
      expect(titleInput).toHaveValue(titleValue);

      titleInput &&
        fireEvent.change(titleInput, { target: { value: 'Recipe Title' } });
      expect(titleInput).toHaveValue('Recipe Title');

      // slug is slugified title
      const slugInput = queryByLabelText('Slug');
      expect(slugInput).toHaveValue('recipe-title');

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

      const equipmentInput = queryByLabelText('Equipment 1');
      expect(equipmentInput).toBeInTheDocument();

      const keywordsInput = queryByLabelText('Keywords 1');
      keywordsInput &&
        fireEvent.change(keywordsInput, {
          target: { value: 'test' }
        });

      expect(keywordsInput).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when editLoading is true', () => {
    it('displays the Loading component', async () => {
      const content = await api.getRecipePage();

      const testContentManagementContext = {
        ...cmContextValues,
        editLoading: true
      };

      jest
        .spyOn(ContentManagementContext, 'useContentManagementContext')
        .mockImplementationOnce(() => testContentManagementContext);

      const { asFragment, queryByRole } = render(
        <RecipeEdit content={content as unknown as RecipeDefaultFragment} />
      );

      // assert that an SVG with an aria role of 'graphics-symbol' exists
      const component = queryByRole('graphics-symbol', { name: 'spinner' });
      expect(component).toBeInTheDocument();

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
