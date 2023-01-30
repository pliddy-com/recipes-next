import NextImage from 'next/image';
import { Asset, ImageDefaultFragment } from 'types/generated/graphql';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'theme';

// TODO: replace with hook

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

interface ImageProps {
  image: ImageDefaultFragment;
}

const Image = ({ image }: ImageProps) => {
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const size = isMd ? 'md' : isSm ? 'sm' : 'xs';

  const { url, description: imgAlt } = image ?? {};
  const src = url || '';
  const alt = imgAlt || '';

  return (
    <NextImage
      alt={alt}
      height={imgSizes.height[size]}
      priority={true}
      src={`${src}?h=${imgSizes.height[size]}&fm=webp`}
      style={{ maxWidth: '100%', height: 'auto' }}
      width={imgSizes.width[size]}
    />
  );
};

export default Image;
