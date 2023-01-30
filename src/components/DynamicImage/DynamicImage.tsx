import { useEffect, useRef, useState } from 'react';

import NextImage from 'next/image';

import { ImageDefaultFragment } from 'types/generated/graphql';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';

// import theme from 'theme';

import config from 'lib/config';

interface ImageProps {
  image: ImageDefaultFragment;
}

const Image = ({ image }: ImageProps) => {
  const componentRef = useRef<HTMLImageElement>(null);

  // store dimensions of the reference image element
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // update width when there's a change to the reference image
  useEffect(() => {
    const { offsetWidth, offsetHeight } = componentRef?.current ?? {};

    offsetWidth && componentRef?.current && setWidth(offsetWidth);
    offsetHeight && componentRef?.current && setHeight(offsetHeight);
  }, [componentRef]);

  const {
    images: { aspectRatio, responsiveIncrement },
  } = config;

  const { url, description: imgAlt } = image ?? {};
  const src = url || '';
  const alt = imgAlt || '';

  // rounds image width up to nearest factor of 400
  const refWidth = Math.ceil(width / responsiveIncrement) * responsiveIncrement;
  const refHeight = refWidth * aspectRatio;

  console.log({ componentRef, width, height, refWidth, refHeight });

  // TODO: configure priority for preload only if in viewport?
  return (
    // <Box ref={componentRef}>
    <NextImage
      ref={componentRef}
      alt={alt}
      height={height * aspectRatio}
      priority={true}
      src={`${src}?w=${refWidth}&fm=webp`}
      style={{ maxWidth: '100%', height: 'auto' }}
      width={width}
    />
    // </Box>
  );
};

export default Image;
