import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import DynamicImage from './DynamicImage';

// import functions to spy on
import responsiveImage from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/generated/graphql';

// set up mock next head component from root level mocks__
jest.mock('next/head');

describe('DynamicImage', () => {
  const props = [
    {
      viewMin: 1000,
      imgWidth: 300,
    },
    {
      viewMin: 500,
      imgWidth: 200,
    },
    {
      imgWidth: 100,
    },
  ];

  describe('when there is a url & image data', () => {
    const url = 'https://URL.test';

    const image: ImageDefaultFragment = {
      sys: {
        id: 'sysId',
        __typename: 'Sys',
      },
      __typename: 'Asset',
      title: 'Image Title',
      description: 'Image Description',
      contentType: 'image/jpeg',
      fileName: 'imageFileName.jpg',
      size: 999999,
      url,
      height: 300,
      width: 400,
    };

    it('it renders a picture component and generates head elements', () => {
      const preload = true;

      // test that createSrcSet & createMediaQuery are called
      const srcSetSpy = jest.spyOn(responsiveImage, 'createSrcSet');
      const mediaQuerySpy = jest.spyOn(responsiveImage, 'createMediaQuery');

      const expectedAlt = image.description || 'Image Description';

      const { getByAltText } = render(
        <DynamicImage image={image} props={props} preload={preload} />
      );

      const pictureTags = document.getElementsByTagName('picture');
      const sourceTags = document.getElementsByTagName('source');
      const imgTags = document.getElementsByTagName('source');
      const linkTags = document.getElementsByTagName('link');

      // expect DynamicImageCompoent to be rendered
      expect(getByAltText(expectedAlt)).toBeInTheDocument();

      // expect there to be 1 picture tag
      expect(pictureTags.length === 1);
      expect(pictureTags[0]).toBeInTheDocument();

      // expect there to be a source tag for each element in props
      expect(sourceTags.length === props.length);
      expect(sourceTags[0]).toBeInTheDocument();

      // expect there to be 1 image tag
      expect(imgTags.length === 1);
      expect(imgTags[0]).toBeInTheDocument();

      // expect there to be a link tag for each element in props
      expect(linkTags.length === 1);
      expect(linkTags[0]).toBeInTheDocument();

      // expect srcSet and mediaQuery creators to be called
      expect(mediaQuerySpy).toHaveBeenCalled();
      expect(srcSetSpy).toHaveBeenCalled();
    });

    it('it does not generate link tags with preload property if preload === false', () => {
      render(<DynamicImage image={image} props={props} />);

      const pictureTags = document.getElementsByTagName('picture');
      const linkTags = document.getElementsByTagName('link');

      // expect there to be 1 picture tag
      expect(pictureTags.length === 1);
      expect(pictureTags[0]).toBeInTheDocument();

      // expect there to be no link tags if no preload property
      expect(linkTags.length === 0);
    });
  });

  describe('when there is no url or image data', () => {
    const image: ImageDefaultFragment = {
      sys: {
        id: 'sysId',
        __typename: 'Sys',
      },
      __typename: 'Asset',
      title: 'Image Title',
      description: 'Image Description',
      contentType: 'image/jpeg',
      fileName: 'imageFileName.jpg',
      size: 999999,
      url: null,
      height: null,
      width: null,
    };

    it('it does not render', () => {
      render(<DynamicImage props={props} image={image} />);

      const pictureTags = document.getElementsByTagName('picture');
      const linkTags = document.getElementsByTagName('link');

      // expect there to be no picture tag
      expect(pictureTags.length === 0);

      // expect there to be no link tags if no preload property
      expect(linkTags.length === 0);
    });
  });
});
