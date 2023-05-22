/* istanbul ignore file */

import { useEffect, useState } from 'react';

import assert from 'assert';

import { OutlinedInput } from '@mui/material';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LockIcon from '@mui/icons-material/Lock';

// import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import ImageEdit from './EditComponents/ImageEdit';
import ListEdit from 'components/Recipe/RecipeEdit/EditComponents/ListEdit';
import Loading from 'components/Loading/Loading';
import RichText from 'components/RichText/RichText';
import SectionEdit from 'components/Recipe/RecipeEdit/EditComponents/SectionEdit';
import TagsEdit from 'components/Recipe/RecipeEdit/EditComponents/TagsEdit';
import TextEdit from 'components/Recipe/RecipeEdit/EditComponents/TextEdit';

// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { minToTime, toSlug } from 'lib/utils';

import { recipePageConfig } from 'theme/values/images';

import {
  ImageDefaultFragment,
  RecipeDefaultFragment,
  RecipeDescription,
  TagDefaultFragment
} from 'types/queries';
import { useContentManagementContext } from 'contexts/Content';

import { IRecipeChangeSet, IRecipeSection } from 'types/content';
import { getLinkedEntries } from 'lib/api';

export type IFormIds =
  | 'abstract'
  | 'cookTime'
  | 'equipment'
  | 'image'
  | 'ingredientsList'
  | 'instructionsList'
  | 'keywords'
  | 'notes'
  | 'prepTime'
  | 'recipeYield'
  | 'slug'
  | 'tags'
  | 'title';

// type ObjEntries<T> = {
//   [K in keyof T]: [K, T[K]];
// }[keyof T][];

// export type IFormIds = ObjEntries<IRecipeChangeSet>;

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

  const { aspectRatio, breakpoints } = recipePageConfig;
  const richText = description as RecipeDescription;

  const { items: tags } = tagsCollection ?? {};

  const defaultState: IRecipeChangeSet = {
    abstract: abstract || '',
    id: sys?.id || '',
    cookTime: cookTime || '0',
    equipment: equipment || [],
    image: image || { sys: { id: '' } },
    ingredientsList: ingredientsList || [],
    instructionsList: instructionsList || [],
    keywords: keywords || [],
    notes: notes || [],
    prepTime: prepTime || '0',
    recipeYield: recipeYield || '0',
    slug: slug || '',
    tags: tags || [],
    title: title || ''
  };

  const { editLoading, setCanSave, setRecipe } = useContentManagementContext();

  const [formData, setFormData] = useState<IRecipeChangeSet>({
    ...defaultState
  });

  const [imageList, setImageList] = useState<
    (ImageDefaultFragment | null)[] | undefined
  >([]);

  const [tagList, setTagList] = useState<
    (TagDefaultFragment | null)[] | undefined
  >([]);

  const resetForm = () => {
    setFormData(defaultState);
    setCanSave(false);
  };

  useEffect(() => {
    getLinkedEntries().then(({ images, tags }) => {
      setImageList(images);
      setTagList(tags);
    });

    return () => {
      resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = ({
    id,
    value
  }: {
    id: IFormIds;
    value:
      | string
      | number
      | (string | null | IRecipeSection)[]
      | (TagDefaultFragment | null | undefined)[]
      | ImageDefaultFragment;
  }) => {
    const newData: IRecipeChangeSet = { ...formData };
    newData[id] = value as string &
      (string | null)[] &
      IRecipeSection[] &
      (TagDefaultFragment | null | undefined)[] &
      ImageDefaultFragment;

    if (id === 'title') newData['slug'] = toSlug(value as string);

    setFormData(newData);
    setRecipe(newData);
    try {
      assert.deepStrictEqual(defaultState, newData);
      setCanSave(false);
    } catch (e) {
      setCanSave(true);
    }
  };

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

      <TextEdit
        className="bold"
        id="title"
        label="Title"
        onChange={(e) => updateField({ id: 'title', value: e.target.value })}
        value={formData.title}
      />

      <TextEdit
        disabled={true}
        endAdornment={<LockIcon />}
        id="slug"
        label="Slug"
        value={formData.slug}
      />

      <FormControl className="multiline">
        <InputLabel htmlFor="abstract" id="abstractLabel">
          Abstract
        </InputLabel>
        <OutlinedInput
          id="abstract"
          inputProps={{
            'aria-label': 'Abstract'
          }}
          label="Abstract"
          multiline
          name="abstract"
          onChange={(e) =>
            updateField({ id: 'abstract', value: e.target.value })
          }
          size="small"
          value={formData.abstract}
        />
      </FormControl>

      <Grid container className="content" spacing={4}>
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

            <TagsEdit
              onChange={({ value }) =>
                updateField({
                  id: 'tags',
                  value
                })
              }
              tagList={tagList}
              tags={formData.tags}
            />

            <Grid container className="details" spacing={2}>
              <Grid item xs={6}>
                <Stack direction="column">
                  <TextEdit
                    className="number"
                    endAdornment={'Min'}
                    id="prepTime"
                    label="Prep Time"
                    onChange={(e) =>
                      updateField({ id: 'prepTime', value: e.target.value })
                    }
                    value={formData.prepTime}
                  />

                  <TextEdit
                    className="number"
                    endAdornment={'Min'}
                    id="cookTime"
                    label="Cook Time"
                    onChange={(e) =>
                      updateField({ id: 'cookTime', value: e.target.value })
                    }
                    value={formData.cookTime}
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
                <TextEdit
                  className="number"
                  endAdornment={'Servings'}
                  id="recipeYield"
                  label="Recipe Yield"
                  onChange={(e) =>
                    updateField({ id: 'recipeYield', value: e.target.value })
                  }
                  value={formData.recipeYield}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          {breakpoints && image && (
            // <Box className="image">
            //   <DynamicImage
            //     aspectRatio={aspectRatio}
            //     breakpoints={breakpoints}
            //     image={image}
            //     preload={true}
            //   />
            // </Box>
            <ImageEdit
              aspectRatio={aspectRatio}
              breakpoints={breakpoints}
              image={image}
              imageList={imageList}
              preload={true}
              onChange={({ value }) => updateField({ id: 'image', value })}
            />
          )}
        </Grid>
      </Grid>

      <Stack direction="column" spacing={3}>
        <SectionEdit
          id="ingredientsList"
          label="Ingredients"
          onChange={({ value }) =>
            updateField({ id: 'ingredientsList', value })
          }
          sectionList={formData.ingredientsList}
        />

        <ListEdit
          heading="h2"
          id="equipment"
          label="Equipment"
          list={formData.equipment}
          onChange={({ value }) => updateField({ id: 'equipment', value })}
        />

        <SectionEdit
          id="instructionsList"
          label="Instructions"
          onChange={({ value }) =>
            updateField({ id: 'instructionsList', value })
          }
          sectionList={formData.instructionsList}
        />

        <ListEdit
          heading="h2"
          id="notes"
          label="Notes"
          list={formData.notes}
          onChange={({ value }) => updateField({ id: 'notes', value })}
        />

        <ListEdit
          heading="h2"
          id="keywords"
          label="Keywords"
          list={formData.keywords}
          onChange={({ value }) => updateField({ id: 'keywords', value })}
        />
      </Stack>
    </Box>
  ) : null;
};

export default RecipeEdit;
