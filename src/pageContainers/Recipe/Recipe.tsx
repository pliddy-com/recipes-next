import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/DynamicImage/DynamicImage';
import EquipmentSection from 'components/EquipmentSection/EquipmentSection';
import IngredientsSection from 'components/IngredientsSection/IngredientsSection';
import InstructionsSection from 'components/InstructionsSection/InstructionsSection';
import NotesSection from 'components/NotesSection/NotesSection';
import RichText from 'components/RichText/RichText';
import TagsSection from 'components/TagsSection/TagsSection';

import {
  RecipeDefaultFragment,
  RecipeDescription,
} from 'types/generated/graphql';

import config from './Recipe.config';

interface RecipeProps {
  content?: RecipeDefaultFragment;
}

const Recipe = ({ content }: RecipeProps) => {
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
    <Container className="page">
      <Box>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>

        {description && (
          <RichText content={description as RecipeDescription} />
          // <RichText content={description} />
        )}
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

        {tags && <TagsSection tags={tags} />}

        {/* <pre>{JSON.stringify(tags, null, 2)}</pre> */}
      </Stack>
    </Container>
  ) : null;
};

export default Recipe;
