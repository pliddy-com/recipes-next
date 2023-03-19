// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeSchema from './RecipeSchema';

import * as api from 'lib/api';
import { RecipeDefaultFragment } from 'types/queries';

jest.mock('lib/api');

describe('RecipeSchema', () => {
  describe('when there is content', () => {
    it('it renders the component', async () => {
      const recipe = await api.getRecipePage({});
      const { asFragment, queryByTestId } = render(
        <RecipeSchema recipe={recipe as unknown as RecipeDefaultFragment} />
      );

      // assert that the component is rendered
      expect(queryByTestId('.recipe-schema')).toBeDefined();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the component', () => {
      const recipe = undefined;

      const { queryByTestId } = render(
        <RecipeSchema recipe={recipe as unknown as RecipeDefaultFragment} />
      );

      expect(queryByTestId('.recipe-schema')).toBeNull();
    });
  });

  describe('when there is missing properties in recipe', () => {
    it('it does not render the component', async () => {
      const recipe = {};

      const { queryByTestId } = render(
        <RecipeSchema recipe={recipe as unknown as RecipeDefaultFragment} />
      );

      expect(queryByTestId('.recipe-schema')).toBeNull();
    });
  });
});
