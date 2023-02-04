import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/DynamicImage/DynamicImage';
import Equipment from 'containers/Recipe/Equipment/Equipment';
import Ingredients from 'containers/Recipe/Ingredients/Ingredients';
import Instructions from 'containers/Recipe/Instructions/Instructions';
import Notes from 'containers/Recipe/Notes/Notes';
import RichText from 'components/RichText/RichText';
import Tags from 'containers/Recipe/Tags/Tags';

import {
  RecipeDefaultFragment,
  RecipeDescription,
} from 'types/generated/graphql';

import config from 'lib/config';

interface RecipeProps {
  content?: RecipeDefaultFragment;
}

const Recipe = ({ content }: RecipeProps) => {
  if (!content) return null;

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

  const {
    images: {
      props: { recipe: imageProps },
    },
  } = config ?? {};

  // TODO: pass full description text into rich text component
  //       & destructure json & links inside component (needs types for json & links)
  //       Need to remove typecasting of RecipeDescription

  // const { json, links } = description ?? {};

  const { items: ingredientsSections } = ingredientsCollection ?? {};
  const { items: instructionsSections } = instructionsCollection ?? {};
  const { items: tags } = tagsCollection ?? {};

  return (
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

      {image && (
        <Box mb={4} mt={4} ml={2} mr={2}>
          <DynamicImage image={image} props={imageProps} preload={true} />
        </Box>
      )}

      <Stack direction="column" spacing={3}>
        {ingredientsCollection &&
          ingredientsCollection.items &&
          ingredientsSections && <Ingredients sections={ingredientsSections} />}

        {equipment && <Equipment equipment={equipment} />}

        {instructionsSections && (
          <Instructions sections={instructionsSections} />
        )}

        {notes && <Notes notes={notes} />}

        {tags && <Tags tags={tags} />}

        {/* <pre>{JSON.stringify(tags, null, 2)}</pre> */}
      </Stack>
    </Container>
  );
};

export default Recipe;
