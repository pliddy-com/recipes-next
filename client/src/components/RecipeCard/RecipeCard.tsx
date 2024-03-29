import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TagButtons from 'components/TagButtons/TagButtons';
import DynamicImage from 'components/Image/DynamicImage/DynamicImage';

import { RecipeDefaultFragment } from 'types/queries';

import { recipeCardConfig } from 'theme/values/images';

interface RecipeCardProps {
  recipe?: RecipeDefaultFragment;
  preloadImg?: boolean;
}

const RecipeCard = ({ recipe, preloadImg = false }: RecipeCardProps) => {
  const { aspectRatio, breakpoints } = recipeCardConfig;
  const { title, abstract, image, slug, tagsCollection } = recipe ?? {};
  const { items: tags } = tagsCollection ?? {};
  const { title: category } = tags?.[0] ?? {};

  return recipe && breakpoints && breakpoints.length > 0 ? (
    <Card variant="outlined" className="recipe">
      <CardActionArea component={Link} href={`/recipes/${slug}`}>
        {image && (
          <CardMedia className="imageWrapper">
            <DynamicImage
              aspectRatio={aspectRatio}
              breakpoints={breakpoints}
              image={image}
              preload={preloadImg}
            />
          </CardMedia>
        )}

        <CardHeader title={title} subheader={category} />
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
