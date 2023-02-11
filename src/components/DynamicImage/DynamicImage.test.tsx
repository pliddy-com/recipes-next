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
  const breakpoints = [
    {
      viewMin: 1000,
      imgWidth: 400,
    },
    {
      viewMin: 500,
      imgWidth: 200,
    },
    {
      imgWidth: 100,
    },
  ];

  describe('when there is a url & image object', () => {
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

      // const expectedAlt = image.description || 'Image Description';

      const { container } = render(
        <DynamicImage
          image={image}
          breakpoints={breakpoints}
          preload={preload}
        />
      );

      // assert that one picture tag is rendered
      const pictureTags = document.getElementsByTagName('picture');
      expect(pictureTags.length === 1).toBe(true);
      expect(pictureTags[0]).toBeInTheDocument();

      // assert that there is a source tag for each element in props
      const sourceTags = document.getElementsByTagName('source');
      expect(sourceTags.length === breakpoints.length).toBe(true);
      expect(sourceTags[0]).toBeInTheDocument();

      // assert that there are image tags
      const imgTags = document.getElementsByTagName('img');
      expect(imgTags[0]).toBeInTheDocument();

      // assert that there are link tags
      const linkTags = document.getElementsByTagName('link');
      expect(linkTags[0]).toBeInTheDocument();

      // assert that srcSet and mediaQuery creators to be called
      expect(mediaQuerySpy).toHaveBeenCalled();
      expect(srcSetSpy).toHaveBeenCalled();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });

    it('it does not generate link tags with preload property if preload === false', () => {
      render(<DynamicImage image={image} breakpoints={breakpoints} />);

      const pictureTags = document.getElementsByTagName('picture');
      const linkTags = document.getElementsByTagName('link');

      // expect there to be 1 picture tag
      expect(pictureTags.length === 1).toBe(true);
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
      render(<DynamicImage breakpoints={breakpoints} image={image} />);

      const pictureTags = document.getElementsByTagName('picture');
      const linkTags = document.getElementsByTagName('link');

      // expect there to be no picture tag
      expect(pictureTags.length === 0);

      // expect there to be no link tags if no preload property
      expect(linkTags.length === 0);
    });
  });
});
