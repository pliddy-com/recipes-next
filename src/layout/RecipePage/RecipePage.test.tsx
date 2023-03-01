// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipePage from './RecipePage';

import { RecipeDefaultFragment } from 'types/queries';

import config from './RecipePage.config';
import * as api from 'lib/api';

jest.mock('lib/api');

jest.createMockFromModule('./RecipePage.config');

describe('Recipe', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the Recipe', async () => {
      jest.spyOn(api, 'getRecipePage');
      const content = await api.getRecipePage();

      const { asFragment, queryByTestId } = render(
        <RecipePage content={content as RecipeDefaultFragment} />
      );

      // assert that content is rendered
      expect(queryByTestId('RecipePage')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    // before each test, delete images node from config
    beforeEach(() => {
      delete config.breakpoints;
    });

    it('it does not render the Recipe', () => {
      const content = undefined;

      render(<RecipePage content={content} />);

      // test if content is not rendered
      render(<RecipePage content={content} />);

      const recipe = document.querySelector('.page');
      expect(recipe).toBeNull();
    });
  });
});
