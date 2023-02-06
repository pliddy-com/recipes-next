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
  const url = 'https://URL.test';
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

  it('it renders a set of preload link tags in a Head component', () => {
    const expectedUrl = 'https://URL.test';
    const expectedImageSizes = '300px';

    // test that createSrcSet & createMediaQuery are called
    const srcSetSpy = jest.spyOn(responsiveImage, 'createSrcSet');
    const mediaQuerySpy = jest.spyOn(responsiveImage, 'createMediaQuery');

    render(<PreloadTags props={props} url={url} />);

    const linkTags = document.getElementsByTagName('link');
    const testTag = linkTags[0];

    //   expect srcSet and mediaQuery creators to be called
    expect(mediaQuerySpy).toHaveBeenCalled();
    expect(srcSetSpy).toHaveBeenCalled();

    // returns 1 tag for each element in props
    expect(linkTags.length === props.length).toBe(true);

    // expect url & imageSizes tags to be created
    expect(testTag.textContent?.includes(expectedUrl));
    expect(testTag.textContent?.includes(expectedImageSizes));
  });
});
