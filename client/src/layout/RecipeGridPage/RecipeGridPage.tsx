import { useEffect, useMemo, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import ResultsPage from 'layout/RecipeGridPage/ResultsPage/ResultsPage';

import { paginateResults, loadNext } from 'lib/infiniteScroll';

import { RecipeDefaultFragment } from 'types/queries';

interface RecipeGridPageProps {
  recipes: (RecipeDefaultFragment | object | null)[];
  title?: string | null;
  page?: number;
  isIndex?: boolean;
}

const RecipeGridPage = ({
  isIndex = false,
  page,
  recipes,
  title
}: RecipeGridPageProps) => {
  const pageSize = 6;
  const scrollThreshold = 800;

  const pagedResults = useMemo(
    () => paginateResults({ data: recipes, pageSize }),
    [recipes]
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

  return (
    <Container className="page recipegrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2">
        {recipes && `${recipes.length} Recipes`}
      </Typography>
      {page ? (
        data &&
        data.map((pageData, pageNum) => (
          <ResultsPage
            key={`results-${pageNum}`}
            data={pageData as RecipeDefaultFragment[]}
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
              <ResultsPage
                key={`results-${pageNum}`}
                data={pageData as RecipeDefaultFragment[]}
                pageNum={pageNum || 0}
                numPages={numPages}
                hideLinks={true}
                isIndex={isIndex}
              />
            ))}
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default RecipeGridPage;
