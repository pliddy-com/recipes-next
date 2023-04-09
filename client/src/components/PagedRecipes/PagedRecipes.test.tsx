import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import PagedRecipes from './PagedRecipes';
import { RecipeDefaultFragment } from 'types/queries';

import pagedRecipes from 'layout/RecipeGridPage/testPayloads/pagedRecipes.json';

jest.mock('lib/api');

describe('PagedRecipes', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is paged content', () => {
    it('it renders the pageinated recipes list', async () => {
      const pageNum = 0;
      const numPages = pagedRecipes.length;

      const { asFragment, queryByTestId } = render(
        <PagedRecipes
          key={`results-${pageNum}`}
          data={pagedRecipes[pageNum] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={true}
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
        <PagedRecipes
          key={`results-${pageNum}`}
          data={pagedRecipes[pageNum] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={false}
        />
      );

      await act(async () =>
        waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument())
      );

      const nextLink = queryByText('Load Next');

      expect(nextLink).toBeDefined();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', './2');
    });
  });

  describe('when hideLinks is true', () => {
    it('it hides the links', async () => {
      const pageNum = 1;
      const numPages = pagedRecipes.length;

      const { queryByTestId, queryByText } = render(
        <PagedRecipes
          key={`results-${pageNum}`}
          data={pagedRecipes[pageNum] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={true}
        />
      );

      await act(async () =>
        waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument())
      );

      const nextLink = queryByText('Load Next');

      expect(nextLink).toBeDefined();
      expect(nextLink).not.toBeVisible();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', './2');
    });
  });

  describe('when there is no paged content', () => {
    it('it does not render the pageinated recipes list', async () => {
      const pageNum = 0;
      const numPages = pagedRecipes.length;

      const { queryByTestId } = render(
        <PagedRecipes
          key={`results-${pageNum}`}
          data={[] as RecipeDefaultFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={true}
        />
      );

      await act(async () =>
        waitFor(() =>
          expect(queryByTestId('results-page')).not.toBeInTheDocument()
        )
      );
    });
  });
});
