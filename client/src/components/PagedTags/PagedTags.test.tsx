import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import PagedTags from './PagedTags';
import { ListPageItemFragment } from 'types/queries';

import pagedTags from 'layout/TagGridPage/testPayloads/pagedTags.json';

jest.mock('lib/api');

describe('PagedRecipes', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is paged content', () => {
    it('it renders the pageinated tags list', async () => {
      const pageNum = 3;
      const numPages = pagedTags.length;

      const { asFragment, queryByTestId } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as ListPageItemFragment[]}
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
    it('it renders the default pagination anchors', async () => {
      const pageNum = 2;
      const numPages = pagedTags.length;

      const { queryByTestId, queryByText } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as ListPageItemFragment[]}
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
      expect(nextLink).toHaveAttribute('href', './3');

      const prevLink = queryByText('Load Previous');

      expect(prevLink).toBeDefined();

      // assert that component has correct href
      expect(prevLink).toHaveAttribute('href', './');
    });
  });

  describe('when hideLinks is true', () => {
    it('it hides the links', async () => {
      const pageNum = 1;
      const numPages = pagedTags.length;

      const { queryByTestId, queryByText } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as ListPageItemFragment[]}
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
      const numPages = pagedTags.length;

      const { queryByTestId } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={[] as ListPageItemFragment[]}
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
