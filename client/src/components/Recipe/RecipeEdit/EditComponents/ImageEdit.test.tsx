import '@testing-library/jest-dom';

// import testing-library methods
import { fireEvent, render, waitFor } from '@testing-library/react';
import ImageEdit, { IImageEdit } from './ImageEdit';

import { ImageDefaultFragment } from 'types/queries';

describe('ImageEdit', () => {
  const aspectRatio = '4 / 3';

  const breakpoints = [
    {
      viewMin: 1000,
      imgWidth: 400
    },
    {
      viewMin: 500,
      imgWidth: 200
    },
    {
      imgWidth: 100
    }
  ];

  const image: ImageDefaultFragment = {
    __typename: 'Asset',
    sys: {
      id: 'img-id'
    },
    description: 'Image Description',
    fileName: 'image-file.jpg',
    height: 300,
    title: 'Image Title',
    url: 'https://image.url',
    width: 400
  };

  const imageList: ImageDefaultFragment[] = [
    {
      __typename: 'Asset',
      sys: {
        id: 'img-id-1'
      },
      description: 'Image Description 1',
      fileName: 'image-file-1.jpg',
      height: 300,
      title: 'Image Title 1',
      url: 'https://image.url/1',
      width: 400
    },
    {
      __typename: 'Asset',
      sys: {
        id: 'img-id-2'
      },
      description: 'Image Description 2',
      height: 300,
      fileName: 'image-file-2.jpg',
      title: 'Image Title 2',
      url: 'https://image.url/2',
      width: 400
    }
  ];

  describe('when there is content', () => {
    it('renders the component', async () => {
      const props: IImageEdit = {
        aspectRatio,
        breakpoints,
        image,
        imageList,
        onChange: jest.fn()
      };

      const { asFragment, getByRole } = render(<ImageEdit {...props} />);

      await waitFor(async () => {
        expect(asFragment()).toMatchSnapshot();
      });

      const clickImage = getByRole('button', {
        name: 'select image image-file-1.jpg'
      });

      clickImage && fireEvent.click(clickImage);
    });
  });
  describe('when imageList is undefined', () => {
    it('it does not render the component', async () => {
      // const tags = undefined as unknown as TagDefaultFragment[];
      const props: IImageEdit = {
        aspectRatio,
        breakpoints,
        image,
        imageList: undefined,
        onChange: jest.fn()
      };

      render(<ImageEdit {...props} />);

      const { asFragment } = render(<ImageEdit {...props} />);

      await waitFor(async () => {
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });

  describe('when images in list imageList are null', () => {
    it('it does not render the component', async () => {
      // const tags = undefined as unknown as TagDefaultFragment[];
      const props: IImageEdit = {
        aspectRatio,
        breakpoints,
        image,
        imageList: [null],
        onChange: jest.fn()
      };

      render(<ImageEdit {...props} />);

      const { asFragment } = render(<ImageEdit {...props} />);

      await waitFor(async () => {
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
