import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import RecipeGridLayout from './RecipeGridLayout';
import { RecipeDefaultFragment } from 'types/queries';

import recipes from 'layout/RecipeGridLayout/testPayloads/recipes.json';

describe('RecipeGridLayout', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is page content', () => {
    it('it renders the RecipeGridLayout', async () => {
      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridLayout
          recipes={recipes as unknown as (RecipeDefaultFragment | null)[]}
          title={title}
        />
      );

      // assert that content is rendered
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeInTheDocument())
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when page number is > 0', () => {
    it('it renders the RecipeGridLayout', async () => {
      const page = 1;

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridLayout
          recipes={recipes as unknown as (RecipeDefaultFragment | null)[]}
          title={title}
          page={page}
        />
      );

      // assert that content is rendered
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeInTheDocument())
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the RecipeGridLayout', async () => {
      const title = 'Title';
      const recipes = [] as unknown as RecipeDefaultFragment[];

      render(<RecipeGridLayout title={title} recipes={recipes} />);

      // test if card compoent is not rendered
      await act(async () =>
        waitFor(() =>
          expect(document.querySelector('.MuiCard-root')).toBeNull()
        )
      );
    });
  });
});
