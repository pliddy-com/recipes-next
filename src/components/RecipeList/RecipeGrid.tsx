import Grid from '@mui/material/Grid';

import Loading from 'components/Loading';
import RecipeCard from 'components/RecipeList/RecipeCard';

import { Maybe, RecipeDefaultFragment } from 'types/generated/graphql';

type RecipeGridProps = {
  recipes?: RecipeDefaultFragment[];
};

const styles = {
  grid: {
    display: 'flex',
  },
};

const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  if (!recipes) return <Loading />;

  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map((recipe: Maybe<RecipeDefaultFragment>) => (
          <Grid item md={4} sm={6} xs={12} key={recipe?.slug} sx={styles.grid}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RecipeGrid;
