import Link from 'next/link';

import useMediaQuery from '@mui/material/useMediaQuery';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TagButtons from '@/components/TagButtons/TagButtons';

import { RecipeDefaultFragment } from 'types/generated/graphql';

import theme from 'theme';

const styles = {
  abstract: {
    mb: '2rem',
  },
  tags: {
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': { ml: 0, mb: '.5rem', mr: '.5rem' },
  },
};

const imgSizes = {
  height: {
    xs: 258,
    sm: 426,
    md: 312,
    lg: 279,
  },
  width: {
    xs: 344,
    sm: 568,
    md: 416,
    lg: 372,
  },
};

interface RecipeCardProps {
  recipe?: RecipeDefaultFragment;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : 'xs';

  if (!recipe) return null;

  const { title, abstract, image, tagsCollection, slug } = recipe ?? {};
  const { items: tags } = tagsCollection ?? {};
  const { title: category } = tags?.[0] ?? {};
  const { url, description } = image ?? {};

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} href={`/recipe/${slug}`}>
        <CardHeader title={title} subheader={category} />
        {image && (
          <CardMedia
            component="img"
            image={`${url}?w=${imgSizes.width[size]}&h=${imgSizes.height[size]}&fm=webp`}
            width="372"
            height="279"
            alt={description || 'image'}
          />
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
