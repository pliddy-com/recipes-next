import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/DynamicImage/DynamicImage';
import Equipment from 'containers/Recipe/Equipment';
import Ingredients from 'containers/Recipe/Ingredients';
import Instructions from 'containers/Recipe/Instructions';
import Notes from 'containers/Recipe/Notes';
import RichText from 'components/RichText/RichText';
import Tags from 'containers/Recipe/Tags';

import {
  RecipeDefaultFragment,
  RecipeDescription,
} from 'types/generated/graphql';

import config from 'lib/config';

import { recipeStyles } from 'lib/styles';

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
      <Grid container direction="row" spacing={2}>
        <Grid item md>
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>

          {description && (
            <RichText content={description as RecipeDescription} />
            // <RichText content={description} />
          )}
        </Grid>
        {image && (
          <Grid item md>
            <Box sx={recipeStyles.pageImageWrapper}>
              <DynamicImage image={image} props={imageProps} preload={true} />
            </Box>
          </Grid>
        )}
      </Grid>
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
