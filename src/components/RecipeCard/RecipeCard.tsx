import Link from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TagButtons from 'components/TagButtons/TagButtons';
import DynamicImage from 'components/DynamicImage/DynamicImage';

import { RecipeDefaultFragment } from 'types/generated/graphql';

import config from 'lib/config';

interface RecipeCardProps {
  recipe?: RecipeDefaultFragment;
  preloadImg?: boolean;
}

const RecipeCard = ({ recipe, preloadImg = false }: RecipeCardProps) => {
  const { title, abstract, image, tagsCollection, slug } = recipe ?? {};
  const { items: tags } = tagsCollection ?? {};
  const { title: category } = tags?.[0] ?? {};
  const { card: imageProps } = config?.images ?? {};

  return recipe && imageProps ? (
    <Card variant="outlined" className="recipe">
      <CardActionArea component={Link} href={`/recipe/${slug}`}>
        <CardHeader title={title} subheader={category} />
        {image && (
          <CardMedia>
            <Box className="imageWrapper">
              <DynamicImage
                image={image}
                props={imageProps}
                preload={preloadImg}
              />
            </Box>
          </CardMedia>
        )}

        <CardContent>
          {abstract && (
            <Typography variant="body2" className="abstract">
              {abstract}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>{tags && <TagButtons tags={tags} />}</CardActions>
    </Card>
  ) : null;
};

export default RecipeCard;
