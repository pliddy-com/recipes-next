// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Recipe from './Recipe';

import { RecipeDefaultFragment } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', async () => {
      const content = await api.getRecipePage();

      const { asFragment, queryByTestId } = render(
        <Recipe content={content as unknown as RecipeDefaultFragment} />
      );

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
      const { queryByTestId } = render(<Recipe content={content} />);

      const recipe = queryByTestId('Recipe');

      expect(recipe).toBeNull();
    });
  });
});
