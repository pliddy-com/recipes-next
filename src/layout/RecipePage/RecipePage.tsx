import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import EquipmentSection from 'components/RecipeSections/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/RecipeSections/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/RecipeSections/InstructionsSection/InstructionsSection';
import NotesSection from 'components/RecipeSections/NotesSection/NotesSection';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/RecipeSections/TagsSection/TagsSection';

import { RecipeDefaultFragment, RecipeDescription } from 'types/queries';

import config from './RecipePage.config';

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
    <Box className="recipe" data-testid="RecipePage">
      <Box>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>

        {description && (
          <RichText content={description as RecipeDescription} />
          // <RichText content={description} />
        )}
        {tags && <TagsSection tags={tags} />}
      </Box>

      {image && breakpoints && (
        <Box
          mx={{
            xs: 0,
            sm: 1,
            md: 2,
          }}
          my={4}
        >
          <DynamicImage
            image={image}
            breakpoints={breakpoints}
            preload={true}
          />
        </Box>
      )}
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

        {/* <pre>{JSON.stringify(tags, null, 2)}</pre> */}
      </Stack>
    </Box>
  ) : null;
};

export default RecipePage;
