import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/Recipe/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/Recipe/RecipeSections/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/Recipe/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/Recipe/RecipeSections/NotesSection/NotesSection';
import TagsSection from 'components/Recipe/RecipeSections/TagsSection/TagsSection';

// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { minToTime } from 'lib/utils';

import { recipePageConfig } from 'theme/values/images';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';
import RichText from 'components/RichText/RichText';
import InputAdornment from '@mui/material/InputAdornment';

interface IRecipeEdit {
  content?: RecipeDefaultFragment;
}

const RecipeEdit = ({ content }: IRecipeEdit) => {
  const {
    abstract,
    cookTime,
    description,
    equipment,
    image,
    ingredientsList,
    instructionsList,
    notes,
    prepTime,
    recipeYield,
    slug,
    tagsCollection,
    title
  } = content ?? {};

  const { aspectRatio, breakpoints } = recipePageConfig;
  const richText = description as RecipeDescription;

  const { items: tags } = tagsCollection ?? {};

  /**
   *
   *  replace multi-line text area with a React rich text editor
   *
   *  https://dev.to/pccprint/10-react-rich-text-editors-1hh5
   *  https://www.sanity.io/guides/top-5-rich-text-react-components
   *
   */

  // const richTextOutput = documentToPlainTextString(json);

  return content ? (
    <Box data-testid="RecipeEdit">
      <TextField
        className="field"
        id="title"
        label="Title"
        value={title}
        variant="outlined"
      />
      <TextField
        className="field"
        id="slug"
        label="Slug"
        value={slug}
        variant="outlined"
      />
      <TextField
        className="multiline"
        id="abstract"
        label="Abstract"
        multiline
        value={abstract}
        variant="outlined"
      />
      <Grid container className="content">
        <Grid item lg={6} className="contentGrid">
          <Stack className="description">
            {description && <RichText content={richText} />}

            {/* {description && (
              <TextField
                id="description"
                label="Description"
                multiline
                maxRows={16}
                value={richTextOutput}
              />
            )} */}
            {tags && <TagsSection tags={tags} />}

            <Grid container className="details" spacing={2}>
              <Grid item xs={6}>
                <Stack direction="column">
                  {prepTime && (
                    <TextField
                      className="field number"
                      id="prepTime"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Min</InputAdornment>
                        )
                      }}
                      label="Prep Time"
                      value={prepTime}
                      variant="outlined"
                    />
                  )}
                  {cookTime && (
                    <TextField
                      className="field number"
                      id="cookTime"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Min</InputAdornment>
                        )
                      }}
                      label="Cook Time"
                      value={cookTime}
                      variant="outlined"
                    />
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
                  <TextField
                    className="field number"
                    id="recipeYield"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Servings</InputAdornment>
                      )
                    }}
                    label="Recipe Yield"
                    value={recipeYield}
                    variant="outlined"
                  />
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
