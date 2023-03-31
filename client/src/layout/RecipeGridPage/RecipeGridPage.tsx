import { Suspense, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';

import { RecipeDefaultFragment } from 'types/queries';
import InfiniteScroll from 'react-infinite-scroller';

const RecipeCard = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeCard' */ 'components/RecipeCard/RecipeCard'
    ),
  { suspense: true }
);

interface RecipeGridPageProps {
  description?: string | null;
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const RecipeGridPage = ({ recipes, title }: RecipeGridPageProps) => {
  const [data, setData] = useState<(RecipeDefaultFragment | null)[]>([]);

  const pageStart = 0;
  const numPreload = 6;
  const scrollThreshold = 900;

  useEffect(() => {
    if (recipes) {
      const subset = recipes.slice(0, numPreload);
      setData(subset);
    }
  }, [recipes]);

  /* istanbul ignore next */
  const loadNext = () => setData(recipes.slice(0, data.length + numPreload));

  return data && data.length > 0 ? (
    <Container className="page recipegrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2">
        {recipes && `${recipes.length} Recipes`}
      </Typography>
      <InfiniteScroll
        hasMore={data.length < recipes.length}
        initialLoad={true}
        isReverse={true}
        loader={<Loading key={`loading-${data.length}`} />}
        loadMore={loadNext}
        pageStart={pageStart}
        threshold={scrollThreshold}
      >
        {/* 
          Make this a results page component that gets repeated for each 12 records
          Include a "next" link to `/{pageUrl}?page=#` that is in the DOM but not visible
          Can include data-url="/{pageUrl}?page=5"
        
        */}

        <Grid container spacing={2}>
          {data &&
            data.map((recipe, index) => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
                <Suspense fallback={<Loading />}>
                  {recipe && (
                    <RecipeCard recipe={recipe} preloadImg={index < 3} />
                  )}
                </Suspense>
              </Grid>
            ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  ) : null;
};

export default RecipeGridPage;
