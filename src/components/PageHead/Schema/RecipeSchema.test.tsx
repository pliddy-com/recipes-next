// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeSchema from './RecipeSchema';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('RecipeSchema', () => {
  describe('when there is content', () => {
    it('it renders the component', async () => {
      const recipe = await api.getRecipePage({});
      const { asFragment } = render(<RecipeSchema recipe={recipe[0]} />);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
