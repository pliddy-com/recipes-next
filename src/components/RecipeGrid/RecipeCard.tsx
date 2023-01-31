import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TagButtons from '@/components/TagButtons/TagButtons';
import DynamicImage from '@/components/DynamicImage/DynamicImage';

import { RecipeDefaultFragment } from 'types/generated/graphql';

const styles = {
  abstract: {
    mb: '2rem',
  },
  wrapper: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
};

interface RecipeCardProps {
  recipe?: RecipeDefaultFragment;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  if (!recipe) return null;

  const { title, abstract, image, tagsCollection, slug } = recipe ?? {};
  const { items: tags } = tagsCollection ?? {};
  const { title: category } = tags?.[0] ?? {};

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} href={`/recipe/${slug}`}>
        <CardHeader title={title} subheader={category} />
        {image && (
          <CardMedia sx={styles.wrapper}>
            <DynamicImage image={image} />
          </CardMedia>
        )}

        <CardContent>
          {abstract && (
            <Typography variant="body2" sx={styles.abstract}>
              {abstract}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>{tags && <TagButtons tags={tags} />}</CardActions>
    </Card>
  );
};

export default RecipeCard;
