import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import PreloadTags from './PreloadTags';

// import functions to spy on
import responsiveImage from 'lib/responsiveImage';

// set up mock next head component from root level mocks__
jest.mock('next/head');

describe('PreloadTags', () => {
  describe('when props and url are provided', () => {
    const url = 'https://URL.test';
    const images = [
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

    it('it renders a set of preload link tags in a Head component', () => {
      const expectedImageSizes = '300px';

      // test that createSrcSet & createMediaQuery are called
      const srcSetSpy = jest.spyOn(responsiveImage, 'createSrcSet');
      const mediaQuerySpy = jest.spyOn(responsiveImage, 'createMediaQuery');

      const { container } = render(<PreloadTags props={images} url={url} />);

      //   expect srcSet and mediaQuery creators to be called
      expect(mediaQuerySpy).toHaveBeenCalled();
      expect(srcSetSpy).toHaveBeenCalled();

      // returns 1 tag for each element in props
      const linkTags = document.getElementsByTagName('link');
      expect(linkTags.length === images.length).toBe(true);

      // expect url & imageSizes tags to be created
      const testTag = linkTags[0];
      expect(testTag.textContent?.includes(url));
      expect(testTag.textContent?.includes(expectedImageSizes));

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when props and url are provided', () => {
    it('it does not render', () => {
      render(<PreloadTags props={[]} url={null as unknown as string} />);

      const linkTags = document.getElementsByTagName('link');

      expect(linkTags.length).toBe(0);
    });
  });
});
