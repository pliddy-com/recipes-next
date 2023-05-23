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

export interface IImageEdit {
  aspectRatio?: AspectRatio;
  breakpoints: Breakpoints[];
  image: ImageDefaultFragment;
  imageList: (ImageDefaultFragment | null)[] | undefined;
  onChange: ({ value }: { value: ImageDefaultFragment }) => void;
  preload?: boolean;
  thumbBreakpoints: Breakpoints[];
}

const ImageEdit = ({
  aspectRatio,
  image,
  imageList,
  breakpoints,
  onChange,
  preload,
  thumbBreakpoints
}: IImageEdit) => {
  const [selectedImage, setSelectedImage] =
    useState<ImageDefaultFragment>(image);

  useEffect(() => {
    setSelectedImage(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (image: ImageDefaultFragment) => {
    setSelectedImage(image);
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
      <ImageList className="edit-image-list">
        {imageList.map((image) =>
          image ? (
            <ImageListItem key={image.url}>
              <Box className="image">
                <DynamicImage
                  aspectRatio={aspectRatio}
                  breakpoints={thumbBreakpoints}
                  image={image}
                  preload={preload}
                />
              </Box>
              <ImageListItemBar
                actionIcon={
                  <IconButton
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
