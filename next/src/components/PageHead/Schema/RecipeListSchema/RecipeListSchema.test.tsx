// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeListSchema from './RecipeListSchema';

import * as api from 'lib/api';
import { RecipeDefaultFragment } from 'types/queries';

jest.mock('lib/api');

describe('RecipeListSchema', () => {
  describe('when there is content', () => {
    it('it renders the component', async () => {
      const [payload] = await api.getRecipeList({});

      const { linkedFrom } = payload ?? {};
      const { recipeCollection } = linkedFrom ?? {};
      const { items: recipes } = recipeCollection ?? {};

      const { asFragment, queryByTestId } = render(
        <RecipeListSchema recipes={recipes as RecipeDefaultFragment[]} />
      );

      // assert that the component is rendered
      expect(queryByTestId('.recipe-list-schema')).toBeDefined();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the component', () => {
      const recipes = undefined;

      const { queryByTestId } = render(
        <RecipeListSchema
          recipes={recipes as unknown as RecipeDefaultFragment[]}
        />
      );

      expect(queryByTestId('.recipe-schema')).toBeNull();
    });
  });
});
