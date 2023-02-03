import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import RecipeCard from 'containers/RecipeGrid/RecipeCard';

import { RecipeDefaultFragment } from 'types/generated/graphql';

interface RecipeGridrops {
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const styles = {
  gridItem: {
    display: 'flex',
  },
};

const RecipeGrid = ({ recipes, title }: RecipeGridrops) => {
  if (!recipes) return <Loading />;

  return (
    <Container className="page">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        {recipes && `${recipes.length} Total`}
      </Typography>
      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe) => (
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
              key={recipe?.slug}
              sx={styles.gridItem}
            >
              {recipe && <RecipeCard recipe={recipe} />}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RecipeGrid;
