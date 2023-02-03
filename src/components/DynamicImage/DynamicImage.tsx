import { useEffect, useRef, useState } from 'react';
// import NextImage from 'next/image';

import Box from '@mui/material/Box';

import { ImageDefaultFragment } from 'types/generated/graphql';

import config from 'lib/config';

interface ImageProps {
  image: ImageDefaultFragment;
  lazy?: boolean;
}

const Image = ({ image, lazy = false }: ImageProps) => {
  const componentRef = useRef<HTMLElement>(null);

  // store dimensions of the reference image element
  const [width, setWidth] = useState(0);

  // update width when there's a change to the reference image
  useEffect(() => {
    const { offsetWidth } = componentRef?.current ?? {};
    offsetWidth && setWidth(offsetWidth);
  }, [componentRef]);

  if (!image) return null;

  const {
    images: { aspectRatio, responsiveIncrement },
  } = config;

  const {
    url,
    description: alt,
    height: imgHeight,
    width: imgWidth,
  } = image ?? {};

  // rounds image width up to nearest factor of 400
  const refWidth = Math.ceil(width / responsiveIncrement) * responsiveIncrement;
  const refHeight = refWidth * aspectRatio;

  // TODO: configure priority for preload only if in viewport?
  return (
    <Box ref={componentRef}>
      {refWidth && refWidth > 0 && (
        <img
          alt={alt || ''}
          height={imgHeight || refHeight}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          // priority={true}
          src={`${url}?w=${refWidth}&fm=webp`}
          style={{ maxWidth: '100%', height: 'auto' }}
          width={imgWidth || refWidth}
        />
      )}
    </Box>
  );
};

export default Image;
