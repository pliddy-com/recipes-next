import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import PagedTags from './PagedTags';
import { ListPageItemFragment } from 'types/queries';

import pagedTags from 'layout/TagGridLayout/testPayloads/pagedTags.json';

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
          data={pagedTags[pageNum] as unknown as ListPageItemFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={true}
        />
      );

      waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument());
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is a page parameter less than 1', () => {
    it('it renders the default next anchor for page 2', async () => {
      const pageNum = 1;
      const numPages = pagedTags.length;

      const { queryByTestId, queryByText } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as unknown as ListPageItemFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={false}
        />
      );

      waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument());

      const nextLink = queryByText('Load Next');

      expect(nextLink).toBeDefined();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', '/tags/page/2');
    });
  });

  describe('when there is a page parameter greater than 1', () => {
    it('it renders the default pagination anchors', async () => {
      const pageNum = 2;
      const numPages = pagedTags.length;

      const { queryByTestId, queryByText } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as unknown as ListPageItemFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={false}
        />
      );

      waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument());

      const nextLink = queryByText('Load Next');

      expect(nextLink).toBeDefined();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', '/tags/page/3');

      const prevLink = queryByText('Load Previous');

      expect(prevLink).toBeDefined();

      // assert that component has correct href
      expect(prevLink).toHaveAttribute('href', '/tags/page/1');
    });
  });

  describe('when hideLinks is true', () => {
    it('it hides the links', async () => {
      const pageNum = 1;
      const numPages = pagedTags.length;

      const { queryByTestId, queryByText } = render(
        <PagedTags
          key={`results-${pageNum}`}
          data={pagedTags[pageNum] as unknown as ListPageItemFragment[]}
          pageNum={pageNum}
          numPages={numPages}
          hideLinks={true}
        />
      );

      waitFor(() => expect(queryByTestId('results-page')).toBeInTheDocument());

      const nextLink = queryByText('Load Next');

      expect(nextLink).toBeDefined();
      expect(nextLink).not.toBeVisible();

      // assert that component has correct href
      expect(nextLink).toHaveAttribute('href', '/tags/page/2');
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

      waitFor(() =>
        expect(queryByTestId('results-page')).not.toBeInTheDocument()
      );
    });
  });
});
