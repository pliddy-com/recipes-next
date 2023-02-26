import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/queries';

interface RecipeGridPageProps {
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const RecipeGridPage = ({ recipes, title }: RecipeGridPageProps) =>
  recipes && recipes.length > 0 ? (
    <Box className="recipegrid" data-testid="recipeGrid">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2">
        {recipes && `${recipes.length} Recipes`}
      </Typography>
      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
              {recipe && <RecipeCard recipe={recipe} preloadImg={index < 2} />}
            </Grid>
          ))}
      </Grid>
    </Box>
  ) : null;

export default RecipeGridPage;
