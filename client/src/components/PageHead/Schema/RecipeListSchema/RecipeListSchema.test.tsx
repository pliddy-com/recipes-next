// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeListSchema from './RecipeListSchema';

import * as api from 'lib/api';
import { RecipeDefaultFragment } from 'types/queries';

jest.mock('lib/api');

const env = process.env;

describe('RecipeListSchema', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env = {
      ...env,
      NEXT_PUBLIC_SITE_URL: 'https://test.recipes.pliddy.com'
    };
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when there is content', () => {
    it('it renders the component', async () => {
      const [payload] = await api.getRecipeList({});

      const { linkedFrom } = payload ?? {};
      const { recipeCollection } = linkedFrom ?? {};
      const { items } = recipeCollection ?? {};

      const { asFragment, queryByTestId } = render(
        <RecipeListSchema
          recipes={items as unknown as RecipeDefaultFragment[]}
        />
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
