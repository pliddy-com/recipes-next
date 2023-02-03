import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RecipeImage from 'components/DynamicImage/RecipeImage';
// import DynamicImage from 'components/DynamicImage/DynamicImage';
import Equipment from 'components/Recipe/Equipment';
import Ingredients from 'components/Recipe/Ingredients';
import Instructions from 'components/Recipe/Instructions';
import Notes from 'components/Recipe/Notes';
import RichText from 'components/RichText/RichText';
import Tags from 'components/Recipe/Tags';

import { RecipeDefaultFragment } from 'types/generated/graphql';

const styles = {
  image: {
    marginBottom: '1rem',
  },
};

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

  // TODO: pass full description text into rich text component
  //       & destructure json & links inside component (needs types for json & links)

  const { json: descriptionDoc } = description ?? {};

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

          {descriptionDoc && <RichText json={descriptionDoc} />}
        </Grid>
        {image && (
          <Grid item md>
            <Box sx={styles.image}>
              <RecipeImage image={image} />
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
