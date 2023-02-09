import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/generated/graphql';

import { flex } from 'lib/styles';

interface RecipeGridProps {
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
}

const RecipeGrid = ({ recipes, title }: RecipeGridProps) =>
  recipes && recipes.length > 0 ? (
    <Container className="page">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        {recipes && `${recipes.length} Total`}
      </Typography>
      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe, index) => (
            <Grid item md={6} sm={6} xs={12} key={recipe?.slug} sx={{ flex }}>
              {recipe && <RecipeCard recipe={recipe} preloadImg={index < 2} />}
            </Grid>
          ))}
      </Grid>
    </Container>
  ) : null;

export default RecipeGrid;
