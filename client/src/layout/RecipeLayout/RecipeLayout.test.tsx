// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipePage from './RecipeLayout';

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
  isLoading: false,
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

describe('RecipePage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the RecipePage', async () => {
      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => authContextValues);

      const cmSpy = jest
        .spyOn(ContentManagementContext, 'useContentManagementContext')
        .mockImplementation(() => cmContextValues);

      const content = await api.getRecipePage();

      const { asFragment, queryByTestId } = render(
        <RecipePage content={content as unknown as RecipeDefaultFragment} />
      );

      expect(authSpy).toBeCalled();
      expect(cmSpy).toBeCalled();

      // assert that content is rendered
      expect(queryByTestId('Recipe')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the Recipe', () => {
      const content = undefined;

      // test if content is not rendered
      render(<RecipePage content={content} />);

      const recipe = document.querySelector('.page');
      expect(recipe).toBeNull();
    });
  });

  describe('when isAuth is true', () => {
    it('sets the container className to "auth"', async () => {
      const testAuthContext = { ...authContextValues, isAuth: true };
      const testContentManagementContext = {
        ...cmContextValues,
        editMode: true
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => testAuthContext);

      const cmSpy = jest
        .spyOn(ContentManagementContext, 'useContentManagementContext')
        .mockImplementation(() => testContentManagementContext);

      const content = await api.getRecipePage();

      const { asFragment, getByTestId } = render(
        <RecipePage content={content as unknown as RecipeDefaultFragment} />
      );

      expect(authSpy).toBeCalled();
      expect(cmSpy).toBeCalled();

      expect(getByTestId('RecipePage')).toHaveClass('auth');
      expect(getByTestId('RecipeEdit')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
