import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import ResultsPage from './ResultsPage';
import { RecipeDefaultFragment } from 'types/queries';

import pagedRecipes from 'layout/RecipeGridPage/testPayloads/pagedRecipes.json';

jest.mock('lib/api');

describe('ResultsPage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is paged content', () => {
    it('it renders the ResultsPage', async () => {
      const pageNum = 0;
      const numPages = pagedRecipes.length;

      const { asFragment, queryByTestId } = render(
        <ResultsPage
          key={`results-${pageNum}`}
          data={pagedRecipes[pageNum] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
        />
      );

      await act(async () =>
        waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument())
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is a page parameter', () => {
    it('it renders the default next anchor for page 2', async () => {
      const pageNum = 1;
      const numPages = pagedRecipes.length;

      const { queryByTestId, queryByText } = render(
        <ResultsPage
          key={`results-${pageNum}`}
          data={pagedRecipes[pageNum] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
        />
      );

      await act(async () =>
        waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument())
      );

      const nextLink = queryByText('Load More');

      expect(nextLink).toBeDefined();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', '/?page=2');
    });
  });
});
