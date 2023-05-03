import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/Recipe/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/Recipe/RecipeSections/IngredientsSection/IngredientsSection';
import InputAdornment from '@mui/material/InputAdornment';
import InstructionsSection from 'components/Recipe/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/Recipe/RecipeSections/NotesSection/NotesSection';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/Recipe/RecipeSections/TagsSection/TagsSection';

// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { minToTime } from 'lib/utils';

import { recipePageConfig } from 'theme/values/images';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';
import { useContentManagementContext } from 'contexts/Content';
import { IFormState } from 'types/content';

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
    sys,
    slug,
    tagsCollection,
    title
  } = content ?? {};

  const defaultState: IFormState = {
    abstract: abstract || '',
    id: sys?.id || '',
    cookTime: cookTime || '0',
    prepTime: prepTime || '0',
    recipeYield: recipeYield || '0',
    slug: slug || '',
    title: title || ''
  };

  const { setRecipe } = useContentManagementContext();

  const [formData, setFormData] = useState<IFormState>(defaultState);

  useEffect(() => {
    setRecipe(formData);
  });

  type IFormIds =
    | 'abstract'
    | 'cookTime'
    | 'prepTime'
    | 'recipeYield'
    | 'slug'
    | 'title';

  const updateForm = ({ id, value }: { id: IFormIds; value: string }) => {
    const newData = { ...formData };
    newData[id] = value;
    setFormData(newData);
  };

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
        onChange={(e) => updateForm({ id: 'title', value: e.target.value })}
        value={formData.title}
        variant="outlined"
      />
      <TextField
        className="field"
        id="slug"
        label="Slug"
        onChange={(e) => updateForm({ id: 'slug', value: e.target.value })}
        value={formData.slug}
        variant="outlined"
      />
      <TextField
        className="multiline"
        id="abstract"
        label="Abstract"
        multiline
        onChange={(e) => updateForm({ id: 'abstract', value: e.target.value })}
        value={formData.abstract}
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
                  <TextField
                    className="field number"
                    id="prepTime"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Min</InputAdornment>
                      )
                    }}
                    label="Prep Time"
                    onChange={(e) =>
                      updateForm({ id: 'prepTime', value: e.target.value })
                    }
                    value={formData.prepTime}
                    variant="outlined"
                  />

                  <TextField
                    className="field number"
                    id="cookTime"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Min</InputAdornment>
                      )
                    }}
                    label="Cook Time"
                    onChange={(e) =>
                      updateForm({ id: 'cookTime', value: e.target.value })
                    }
                    value={formData.cookTime}
                    variant="outlined"
                  />

                  <Typography variant="subtitle2">
                    <strong>Total Time:</strong>{' '}
                    {minToTime(
                      Number(formData.prepTime) + Number(formData.cookTime)
                    )}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} className="yield">
                <TextField
                  className="field number"
                  id="recipeYield"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Servings</InputAdornment>
                    )
                  }}
                  label="Recipe Yield"
                  onChange={(e) =>
                    updateForm({ id: 'recipeYield', value: e.target.value })
                  }
                  value={formData.recipeYield}
                  variant="outlined"
                />
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
