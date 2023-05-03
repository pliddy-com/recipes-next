import { useEffect, useMemo, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import PagedTags from 'components/PagedTags/PagedTags';

import { paginateResults, loadNext } from 'lib/infiniteScroll';

import { ListPageItemFragment } from 'types/queries';

interface TagGridLayoutProps {
  isIndex?: boolean;
  page?: number;
  tags: (ListPageItemFragment | null)[];
  title?: string | null;
}

const TagGridLayout = ({ isIndex, page, tags, title }: TagGridLayoutProps) => {
  const pageSize = 4;
  const scrollThreshold = 800;

  const pagedResults = useMemo(
    () => paginateResults({ data: tags, pageSize }),
    [tags]
  );

  const numPages = pagedResults.length;

  const [pageNum, setPageNum] = useState<number>(page ? page : 1);
  const [data, setData] = useState<(object | null)[][]>([
    pagedResults[pageNum - 1]
  ]);

  const hasMore = pageNum < numPages;

  useEffect(() => {
    setData([pagedResults[page ? page - 1 : 0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagedResults]);

  /* istanbul ignore next */
  const loadMore = () =>
    loadNext({
      pagedResults,
      pageNum,
      pageSize,
      setDataCallback: setData,
      setPageNumCallback: setPageNum
    });

  return data && tags && tags.length > 0 ? (
    <Container className="page tagGrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2">
        {tags && `${tags.length} Tags`}
      </Typography>

      {page ? (
        data &&
        data.map((pageData, pageNum) => (
          <PagedTags
            key={`results-${pageNum}`}
            data={pageData as ListPageItemFragment[]}
            pageNum={page}
            numPages={numPages}
            hideLinks={false}
            isIndex={isIndex}
          />
        ))
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          initialLoad={true}
          isReverse={false}
          loader={<Loading key={`loading-${data.length}`} />}
          loadMore={loadMore}
          pageStart={pageNum}
          threshold={scrollThreshold}
        >
          {data &&
            data.map((pageData, pageNum) => (
              <PagedTags
                key={`results-${pageNum}`}
                data={pageData as ListPageItemFragment[]}
                pageNum={pageNum || 0}
                numPages={numPages}
                hideLinks={true}
                isIndex={isIndex}
              />
            ))}
        </InfiniteScroll>
      )}
    </Container>
  ) : null;
};

export default TagGridLayout;
