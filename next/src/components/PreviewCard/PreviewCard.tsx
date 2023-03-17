import Link from 'next/link';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';

import { RecipeDefaultFragment } from 'types/queries';

import config from './PreviewCard.config';

interface PreviewCardProps {
  recipe?: RecipeDefaultFragment;
  preloadImg?: boolean;
}

const PreviewCard = ({ recipe, preloadImg = false }: PreviewCardProps) => {
  const { breakpoints } = config;
  const { title, abstract, image, slug } = recipe ?? {};

  return recipe && breakpoints && breakpoints.length > 0 ? (
    <Card variant="outlined" className="preview">
      <CardActionArea component={Link} href={`/recipe/${slug}`}>
        <Stack className="stack">
          {image && (
            <CardMedia className="imageWrapper">
              <DynamicImage
                image={image}
                breakpoints={breakpoints}
                preload={preloadImg}
              />
            </CardMedia>
          )}

          <CardContent>
            <CardHeader title={title} />

            {abstract && (
              <Typography variant="body2" className="abstract">
                {abstract}
              </Typography>
            )}
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  ) : null;
};

export default PreviewCard;