import { useEffect, useState } from 'react';

import assert from 'assert';

import { OutlinedInput } from '@mui/material';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import LockIcon from '@mui/icons-material/Lock';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/Recipe/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/Recipe/RecipeSections/IngredientsSection/IngredientsSection';
import InputAdornment from '@mui/material/InputAdornment';
import InstructionsSection from 'components/Recipe/RecipeSections/InstructionsSection/InstructionsSection';
import ListEdit from './EditComponents/ListEdit';
import Loading from 'components/Loading/Loading';
import NotesSection from 'components/Recipe/RecipeSections/NotesSection/NotesSection';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/Recipe/RecipeSections/TagsSection/TagsSection';

// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { minToTime, toSlug } from 'lib/utils';

import { recipePageConfig } from 'theme/values/images';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';
import { useContentManagementContext } from 'contexts/Content';

import { IRecipeChangeSet } from 'types/content';

export type IFormIds =
  | 'abstract'
  | 'cookTime'
  // | 'equipment'
  // | 'keywords'
  | 'prepTime'
  | 'recipeYield'
  | 'slug'
  | 'title';

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
    keywords,
    notes,
    prepTime,
    recipeYield,
    sys,
    slug,
    tagsCollection,
    title
  } = content ?? {};

  const defaultState: IRecipeChangeSet = {
    abstract: abstract || '',
    id: sys?.id || '',
    cookTime: cookTime || '0',
    // equipment: equipment || [],
    // keywords: equipment || [],
    prepTime: prepTime || '0',
    recipeYield: recipeYield || '0',
    slug: slug || '',
    title: title || ''
  };

  const { editLoading, setCanSave, setRecipe } = useContentManagementContext();

  const [formData, setFormData] = useState<IRecipeChangeSet>(defaultState);

  const resetForm = () => {
    setFormData(defaultState);
    setCanSave(false);
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateForm = ({ id, value }: { id: IFormIds; value: string }) => {
    const newData = { ...formData };

    newData[id] = value;

    setFormData(newData);
    setRecipe(newData);

    try {
      // console.log('updateForm:', { defaultState, newData });
      assert.deepStrictEqual(defaultState, newData);
      setCanSave(false);
    } catch (e) {
      setCanSave(true);
    }
  };

  const updateTitle = ({ title }: { title: string }) => {
    const newData = { ...formData };

    newData['title'] = title;
    newData['slug'] = toSlug(title);

    setFormData(newData);
    setRecipe(newData);

    try {
      assert.deepStrictEqual(defaultState, newData);
      setCanSave(false);
    } catch (e) {
      setCanSave(true);
    }
  };

  // const updateTitle = ({ id, title }: { id: IFormIds; title: string }) => {
  //   updateForm({ id, value: title });
  //   updateForm({ id: 'slug', value: toSlug(title) });
  // };

  const updateList = () => {
    console.log('updateList');
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

  if (editLoading) return <Loading />;

  return content ? (
    <Box data-testid="RecipeEdit" className="recipe-edit">
      <Typography variant="h1" sx={{ visibility: 'hidden', height: 0 }}>
        {title}
      </Typography>

      <TextField
        className="field bold"
        id="title"
        label="Title"
        name="title"
        onChange={(e) => updateTitle({ title: e.target.value })}
        size="small"
        value={formData.title}
        variant="outlined"
      />
      <TextField
        className="field"
        disabled={true}
        id="slug"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          )
        }}
        label="Slug"
        name="slug"
        size="small"
        value={formData.slug}
        variant="outlined"
      />
      <FormControl className="multiline">
        <InputLabel htmlFor="abstract" id="abstractLabel">
          Abstract
        </InputLabel>
        <OutlinedInput
          id="abstract"
          inputProps={{ 'data-test': 'TEST' }}
          label="Abstract"
          multiline
          name="abstract"
          onChange={(e) =>
            updateForm({ id: 'abstract', value: e.target.value })
          }
          size="small"
          value={formData.abstract}
        />
      </FormControl>

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
                    size="small"
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
                    size="small"
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
                  size="small"
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

        {equipment && (
          <ListEdit label="Equipment" list={equipment} onChange={updateList} />
        )}

        {instructionsList && (
          <InstructionsSection sections={instructionsList} />
        )}

        {notes && <NotesSection notes={notes} />}

        {keywords && (
          <ListEdit label="Keywords" list={keywords} onChange={updateList} />
        )}
      </Stack>
    </Box>
  ) : null;
};

export default RecipeEdit;
