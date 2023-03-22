import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/queries';

interface RecipeGridPageProps {
  description?: string | null;
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const RecipeGridPage = ({ recipes, title }: RecipeGridPageProps) => {
  // sorting recipes; should be part of gql query?
  // recipes &&
  //   recipes.sort((a, b) =>
  //     a && b && a.slug && b.slug && a.slug > b.slug ? 1 : -1
  //   );

  const [data, setData] = useState<(RecipeDefaultFragment | null)[]>([]);

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
        loader={<Loading key={`loading-${data.length}`} />}
        loadMore={loadNext}
        pageStart={0}
        threshold={scrollThreshold}
      >
        <Grid container spacing={2}>
          {data &&
            data.map((recipe, index) => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
                {recipe && (
                  <RecipeCard recipe={recipe} preloadImg={index < 3} />
                )}
              </Grid>
            ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  ) : null;
};

export default RecipeGridPage;
