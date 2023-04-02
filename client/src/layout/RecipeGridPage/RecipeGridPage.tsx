import { useEffect, useMemo, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import ResultsPage from 'layout/RecipeGridPage/ResultsPage/ResultsPage';

import { paginateResults, loadNext } from 'lib/infiniteScroll';

import { RecipeDefaultFragment } from 'types/queries';

interface RecipeGridPageProps {
  description?: string | null;
  recipes: (RecipeDefaultFragment | object | null)[];
  title?: string | null;
}

const RecipeGridPage = ({ recipes, title }: RecipeGridPageProps) => {
  const pageSize = 6;
  const scrollThreshold = 600;

  const pagedResults = useMemo(
    () => paginateResults({ data: recipes, pageSize }),
    [recipes]
  );

  const numPages = pagedResults.length;

  const [data, setData] = useState<(object | null)[][]>([[]]);
  const [pageNum, setPageNum] = useState<number>(0);

  const hasMore = pageNum < numPages;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageQuery = urlParams.get('page') || 0;

    const pageNumber =
      pageQuery && Number(pageQuery) > 0 ? Number(pageQuery) : 0;

    if (Number(pageQuery) < pagedResults.length) setPageNum(Number(pageQuery));

    setData([pagedResults[pageNumber]]);
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
      <InfiniteScroll
        hasMore={hasMore}
        initialLoad={false}
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
              pageNum={pageNum}
              numPages={numPages}
            />
          ))}
      </InfiniteScroll>
    </Container>
  );
};

export default RecipeGridPage;
