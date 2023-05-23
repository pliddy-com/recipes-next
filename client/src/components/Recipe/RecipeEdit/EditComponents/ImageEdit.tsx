import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';

import DynamicImage from 'components/Image/DynamicImage/DynamicImage';
import NavIconButton from 'components/Navigation/Buttons/NavIconButton/NavIconButton';

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

  const [openChangeImage, setOpenChangeImage] = useState<boolean>(false);
  const [openUploadImage, setOpenUploadImage] = useState<boolean>(false);

  useEffect(() => {
    setSelectedImage(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (image: ImageDefaultFragment) => {
    setSelectedImage(image);
    onChange({ value: image });
    setOpenChangeImage(false);
  };

  const showChangeImage = () => {
    setOpenChangeImage(!openChangeImage);
    setOpenUploadImage(false);
  };

  const showUploadImage = () => {
    setOpenUploadImage(!openUploadImage);
    setOpenChangeImage(false);
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

      <Stack
        direction={'row'}
        sx={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}
      >
        <NavIconButton
          ariaLabel={'change image button'}
          className="edit-button"
          hideLabel={false}
          icon={<ImageIcon />}
          isMenu={true}
          isOpen={openChangeImage}
          label={'Change Image'}
          onClick={showChangeImage}
          variant="outlined"
        />

        <NavIconButton
          ariaLabel={'upload image button'}
          className="edit-button"
          disabled={openUploadImage}
          hideLabel={false}
          icon={<CloudUploadIcon />}
          label={'Add Image'}
          onClick={showUploadImage}
          variant="outlined"
        />
      </Stack>

      {openChangeImage && (
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
      )}
    </Stack>
  ) : null;
};

export default ImageEdit;
