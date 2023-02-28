import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/RecipeSections/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/RecipeSections/NotesSection/NotesSection';
import RecipeSchema from 'components/PageHead/Schema/RecipeSchema';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/RecipeSections/TagsSection/TagsSection';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';

import config from './RecipePage.config';
import Container from '@mui/material/Container';

interface RecipePageProps {
  content?: RecipeDefaultFragment;
}

const RecipePage = ({ content }: RecipePageProps) => {
  const {
    title,
    description,
    equipment,
    image,
    ingredientsCollection,
    instructionsCollection,
    notes,
    tagsCollection,
  } = content ?? {};

  const { breakpoints } = config;

  // TODO: pass full description text into rich text component
  //       & destructure json & links inside component (needs types for json & links)
  //       Need to remove typecasting of RecipeDescription

  // const { json, links } = description ?? {};

  const { items: ingredientsSections } = ingredientsCollection ?? {};
  const { items: instructionsSections } = instructionsCollection ?? {};
  const { items: tags } = tagsCollection ?? {};

  return content ? (
    <Container className="page recipe" data-testid="page" maxWidth="xl">
      <RecipeSchema recipe={content} />
      <Box className="recipe" data-testid="RecipePage">
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>

        <Grid container className="content">
          <Grid item lg={6}>
            <Stack className="description">
              {description && (
                <RichText content={description as RecipeDescription} />
                // <RichText content={description} />
              )}
              {tags && <TagsSection tags={tags} />}
            </Stack>
          </Grid>
          <Grid item lg={6}>
            {' '}
            {image && breakpoints && (
              <Box className="image">
                <DynamicImage
                  image={image}
                  breakpoints={breakpoints}
                  preload={true}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Stack direction="column" spacing={3}>
          {ingredientsCollection &&
            ingredientsCollection.items &&
            ingredientsSections && (
              <IngredientsSection sections={ingredientsSections} />
            )}

          {equipment && <EquipmentSection equipment={equipment} />}

          {instructionsSections && (
            <InstructionsSection sections={instructionsSections} />
          )}

          {notes && <NotesSection notes={notes} />}
        </Stack>
      </Box>
    </Container>
  ) : null;
};

export default RecipePage;
