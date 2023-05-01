import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/RecipeSections/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/RecipeSections/NotesSection/NotesSection';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/RecipeSections/TagsSection/TagsSection';

import { minToTime } from 'lib/utils';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';

import { recipePageConfig } from 'theme/values/images';

interface RecipePageProps {
  content?: RecipeDefaultFragment;
}

const RecipePage = ({ content }: RecipePageProps) => {
  const {
    cookTime,
    description,
    equipment,
    image,
    ingredientsList,
    instructionsList,
    notes,
    prepTime,
    recipeYield,
    tagsCollection,
    title
  } = content ?? {};

  const { aspectRatio, breakpoints } = recipePageConfig;

  const richText = description as RecipeDescription;

  const { items: tags } = tagsCollection ?? {};

  return content ? (
    <Container className="page recipe" data-testid="page" maxWidth="xl">
      <Box className="recipe" data-testid="RecipePage">
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>

        <Grid container className="content">
          <Grid item lg={6} className="contentGrid">
            <Stack className="description">
              {/* TODO: fix this with a rich text fragment */}
              {description && <RichText content={richText} />}
              {tags && <TagsSection tags={tags} />}

              <Grid container className="details">
                <Grid item xs={6}>
                  <Stack direction="column">
                    {prepTime && (
                      <Typography variant="subtitle2">
                        <strong>Prep Time:</strong>{' '}
                        {minToTime(Number(prepTime))}
                      </Typography>
                    )}
                    {cookTime && (
                      <Typography variant="subtitle2">
                        <strong>Cook Time:</strong>{' '}
                        {minToTime(Number(cookTime))}
                      </Typography>
                    )}
                    {(prepTime || cookTime) && (
                      <Typography variant="subtitle2">
                        <strong>Total Time:</strong>{' '}
                        {minToTime(Number(prepTime) + Number(cookTime))}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={6} className="yield">
                  {recipeYield && (
                    <Typography variant="subtitle2">
                      <strong>Yield:</strong> {recipeYield} servings
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item lg={6}>
            {breakpoints && image && (
              <Box className="image">
                <DynamicImage
                  aspectRatio={aspectRatio}
                  breakpoints={breakpoints}
                  image={image}
                  preload={true}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Stack direction="column" spacing={3}>
          {ingredientsList && <IngredientsSection sections={ingredientsList} />}

          {equipment && <EquipmentSection equipment={equipment} />}

          {instructionsList && (
            <InstructionsSection sections={instructionsList} />
          )}

          {notes && <NotesSection notes={notes} />}
        </Stack>
      </Box>
    </Container>
  ) : null;
};

export default RecipePage;
