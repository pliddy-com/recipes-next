import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/Recipe/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/Recipe/RecipeSections/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/Recipe/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/Recipe/RecipeSections/NotesSection/NotesSection';
import TagsSection from 'components/Recipe/RecipeSections/TagsSection/TagsSection';
import RichText from 'components/RichText/RichText';

import { minToTime } from 'lib/utils';

import { recipePageConfig } from 'theme/values/images';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';

interface IRecipeEdit {
  content?: RecipeDefaultFragment;
}

const RecipeEdit = ({ content }: IRecipeEdit) => {
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
    <Box data-testid="RecipeEdit" sx={{ background: 'mistyrose' }}>
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
                      <strong>Prep Time:</strong> {minToTime(Number(prepTime))}
                    </Typography>
                  )}
                  {cookTime && (
                    <Typography variant="subtitle2">
                      <strong>Cook Time:</strong> {minToTime(Number(cookTime))}
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
  ) : null;
};

export default RecipeEdit;
