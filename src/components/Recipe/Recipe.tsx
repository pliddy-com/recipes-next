import Image from 'next/image';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Equipment from 'components/Recipe/Equipment';
import Ingredients from 'components/Recipe/Ingredients';
import Instructions from 'components/Recipe/Instructions';
// import Loading from 'components/Loading';
import Notes from 'components/Recipe/Notes';
import Tags from 'components/Recipe/Tags';

// TODO: componentize
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { RecipeDefaultFragment } from 'types/generated/graphql';

import theme from 'theme';

const imgSizes = {
  height: {
    xs: 426,
    sm: 636,
    md: 426,
    lg: 426,
  },
  width: {
    xs: 568,
    sm: 848,
    md: 568,
    lg: 568,
  },
};

interface RecipeProps {
  recipe?: RecipeDefaultFragment;
}

const Recipe = ({ recipe }: RecipeProps) => {
  //   const { slug } = useParams() ?? {};

  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isMd ? 'md' : isSm ? 'sm' : 'xs';

  if (!recipe) return null;

  const {
    title,
    description,
    equipment,
    image,
    ingredientsCollection,
    instructionsCollection,
    notes,
    tagsCollection,
  } = recipe ?? {};

  const { json: descriptionDoc } = description ?? {};
  const { url, description: imgAlt } = image ?? {};
  const src = url || '';
  const alt = imgAlt || '';

  const { items: ingredientsSections } = ingredientsCollection ?? {};
  const { items: instructionsSections } = instructionsCollection ?? {};
  const { items: tags } = tagsCollection ?? {};

  /*
    contentType: "image/jpeg"
    description: "Sole Meunière on a bed of chopped green lettuce and roma tomatoes with a white balsamic-lemon vinaigrette."
    fileName: "sole-meuniere.jpg"
    height: 3024
    size: 2758954
    title: "Sole Meunière"
    url: "https://images.ctfassets.net/fo9qwg6zarbt/7JzbZn07fY62akLYWhNqDg/df3f00e87d2ebab4f807caac8e2befcb/sole-meuniere.jpg"
    width: 4032
  */

  console.log(image);

  return (
    <Container className="main" component="main">
      <Grid container direction="row" spacing={2}>
        <Grid item md>
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          {descriptionDoc && (
            <Box>{documentToReactComponents(descriptionDoc)}</Box>
          )}
        </Grid>
        {image && (
          <Grid item md>
            <Image
              alt={alt}
              height={imgSizes.height[size]}
              priority={true}
              src={`${src}?h=${imgSizes.height[size]}&fm=webp`}
              style={{ maxWidth: '100%', height: 'auto' }}
              width={imgSizes.width[size]}
            />
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
