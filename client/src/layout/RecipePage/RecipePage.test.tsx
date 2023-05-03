// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipePage from './RecipePage';

import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';
import * as AuthContext from 'contexts/Authentication';

jest.mock('lib/api');
jest.mock('contexts/Authentication');

describe('RecipePage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the RecipePage', async () => {
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

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const content = await api.getRecipePage();

      const { asFragment, queryByTestId } = render(
        <RecipePage content={content as unknown as RecipeDefaultFragment} />
      );

      expect(authSpy).toBeCalled();

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
      const contextValues = {
        editMode: true,
        getToken: jest.fn(),
        isAuth: true,
        isLoading: false,
        saveRecipe: jest.fn(),
        setRecipe: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn(),
        toggleEdit: jest.fn()
      };

      const authSpy = jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => contextValues);

      const content = await api.getRecipePage();

      const { asFragment, getByTestId } = render(
        <RecipePage content={content as unknown as RecipeDefaultFragment} />
      );

      expect(authSpy).toBeCalled();

      expect(getByTestId('RecipePage')).toHaveClass('auth');
      expect(getByTestId('RecipeEdit')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
