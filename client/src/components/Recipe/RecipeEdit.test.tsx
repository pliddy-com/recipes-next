// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeEdit from './RecipeEdit';

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
        <RecipeEdit content={content as unknown as RecipeDefaultFragment} />
      );

      // assert that content is rendered
      expect(queryByTestId('RecipeEdit')).toBeInTheDocument();

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
