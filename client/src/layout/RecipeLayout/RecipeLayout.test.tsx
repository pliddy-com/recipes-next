// import testing-library methods
import { render, waitFor } from '@testing-library/react';

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
jest.mock('components/Recipe/RecipeEdit/EditComponents/TagsEdit');

describe('RecipePage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the RecipePage', async () => {
      const authSpy = jest.spyOn(AuthContext, 'useAuthContext');

      const cmSpy = jest.spyOn(
        ContentManagementContext,
        'useContentManagementContext'
      );

      const content = await api.getRecipePage();

      const { asFragment, queryByTestId } = render(
        <RecipePage content={content as unknown as RecipeDefaultFragment} />
      );

      // assert that content is rendered
      waitFor(() => expect(queryByTestId('Recipe')).toBeInTheDocument());

      expect(authSpy).toBeCalled();
      expect(cmSpy).toBeCalled();

      // expect(queryByTestId('Recipe')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the Recipe', () => {
      const content = undefined;

      // test if content is not rendered
      render(<RecipePage content={content} />);

      // assert that content is not rendered
      waitFor(() => {
        const recipe = document.querySelector('.page');
        expect(recipe).toBeNull();
      });
    });
  });

  describe('when isAuth is true', () => {
    it('sets the container className to "auth"', async () => {
      const testAuthContext = {
        ...AuthContext.useAuthContext(),
        isAuth: true
      };
      const testContentManagementContext = {
        ...ContentManagementContext.useContentManagementContext(),
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

      // assert that content is rendered
      waitFor(() => {
        expect(getByTestId('RecipePage')).toHaveClass('auth');
        expect(getByTestId('RecipeEdit')).toBeInTheDocument();
      });

      expect(authSpy).toBeCalled();
      expect(cmSpy).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
