/* istanbul ignore file */

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';

import { Breakpoints } from 'lib/responsiveImage';

import { AspectRatio } from 'theme/values/images';

import { ImageDefaultFragment } from 'types/queries';

export interface ImageProps {
  aspectRatio?: AspectRatio;
  breakpoints: Breakpoints[];
  image: ImageDefaultFragment;
  imageList: (ImageDefaultFragment | null)[] | undefined;
  onChange: ({ value }: { value: ImageDefaultFragment }) => void;
  preload?: boolean;
}

const thumbBreakponts = [
  {
    viewMin: 960,
    imgWidth: 300
  },
  {
    viewMin: 656,
    imgWidth: 200
  },
  {
    imgWidth: 200
  }
];

const ImageEdit = ({
  aspectRatio = '4 / 3',
  image,
  imageList,
  breakpoints,
  onChange,
  preload = false
}: ImageProps) => {
  const [selectedImage, setSelectedImage] =
    useState<ImageDefaultFragment>(image);

  useEffect(() => {
    setSelectedImage(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (image: ImageDefaultFragment) => {
    setSelectedImage(image);
    console.log(image);
    onChange({ value: image });
  };
  return imageList ? (
    <Stack className="image-edit">
      <Box className="image original">
        <DynamicImage
          aspectRatio={aspectRatio}
          breakpoints={breakpoints}
          image={selectedImage}
          preload={preload}
        />
      </Box>
      <ImageList
        cols={3}
        //   TODO: check specificity to override inline style injected by Material UI
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          overflowY: 'scroll',
          marginBlockStart: '0',
          marginBlockEnd: '0'
        }}
      >
        {imageList.map((image) =>
          image ? (
            <ImageListItem key={image.url}>
              <Box className="image">
                <DynamicImage
                  aspectRatio={aspectRatio}
                  breakpoints={thumbBreakponts}
                  image={image}
                  preload={preload}
                />
              </Box>
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`select image ${image.fileName}`}
                    onClick={() => handleClick(image)}
                  >
                    <AddCircleIcon />
                  </IconButton>
                }
                title={image.fileName}
              />
            </ImageListItem>
          ) : null
        )}
      </ImageList>
    </Stack>
  ) : null;
};

export default ImageEdit;
