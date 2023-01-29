import Grid from '@mui/material/Grid';

import Loading from 'components/Loading';
import RecipeCard from '@/components/RecipeGrid/RecipeCard';

import { Maybe, RecipeDefaultFragment } from 'types/generated/graphql';

interface RecipeGridrops {
  recipes: (RecipeDefaultFragment | null)[];
}

const styles = {
  grid: {
    display: 'flex',
  },
};

const RecipeGrid = ({ recipes }: RecipeGridrops) => {
  if (!recipes) return <Loading />;

  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map((recipe) => (
          <Grid item md={4} sm={6} xs={12} key={recipe?.slug} sx={styles.grid}>
            {recipe && <RecipeCard recipe={recipe} />}
          </Grid>
        ))}
    </Grid>
  );
};

export default RecipeGrid;
