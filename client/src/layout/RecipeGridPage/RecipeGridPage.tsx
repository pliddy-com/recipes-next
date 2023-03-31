import { Suspense } from 'react';

import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';

import { RecipeDefaultFragment } from 'types/queries';

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
  // const router = useRouter();
  // const { page } = router.query;

  // console.log({ page });

  return recipes && recipes.length > 0 ? (
    <Container className="page recipegrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2">
        {recipes && `${recipes.length} Recipes`}
      </Typography>

      {/* 
          Make this a results page component that gets repeated for each 12 records
          Include a "next" link to `/{pageUrl}?page=#` that is in the DOM but not visible
          Can include data-url="/{pageUrl}?page=5"
        
        */}

      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
              <Suspense fallback={<Loading />}>
                {recipe && (
                  <RecipeCard recipe={recipe} preloadImg={index < 3} />
                )}
              </Suspense>
            </Grid>
          ))}
      </Grid>
    </Container>
  ) : null;
};

export default RecipeGridPage;
