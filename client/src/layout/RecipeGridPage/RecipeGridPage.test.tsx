import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import RecipeGridPage from './RecipeGridPage';
import { RecipeDefaultFragment } from 'types/queries';

import recipes from 'layout/RecipeGridPage/testPayloads/recipes.json';

describe('RecipeGridPage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is page content', () => {
    it('it renders the RecipeGridPage', async () => {
      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridPage
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
    it('it renders the RecipeGridPage', async () => {
      const pageNum = '1';

      const paramSpy = jest
        .spyOn(URLSearchParams.prototype, 'get')
        .mockImplementation(() => pageNum);

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridPage
          recipes={recipes as unknown as (RecipeDefaultFragment | null)[]}
          title={title}
        />
      );

      // assert that content is rendered
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeInTheDocument())
      );

      expect(paramSpy).toBeCalled();
      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the RecipeGridPage', async () => {
      const title = 'Title';
      const recipes = [] as unknown as RecipeDefaultFragment[];

      render(<RecipeGridPage title={title} recipes={recipes} />);

      // test if card compoent is not rendered
      await act(async () =>
        waitFor(() =>
          expect(document.querySelector('.MuiCard-root')).toBeNull()
        )
      );
    });
  });
});
