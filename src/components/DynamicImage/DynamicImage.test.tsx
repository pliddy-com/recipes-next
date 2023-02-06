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
  it('it renders a picture component and generates head elements', () => {
    const preload = true;
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

    // test that createSrcSet & createMediaQuery are called
    const srcSetSpy = jest.spyOn(responsiveImage, 'createSrcSet');
    const mediaQuerySpy = jest.spyOn(responsiveImage, 'createMediaQuery');

    const expectedAlt = image.description || 'Image Description';

    const { getByAltText } = render(
      <DynamicImage image={image} props={props} preload={preload} />
    );

    const res = getByAltText(expectedAlt);
    console.log({ res });

    // expect srcSet and mediaQuery creators to be called
    expect(mediaQuerySpy).toHaveBeenCalled();
    expect(srcSetSpy).toHaveBeenCalled();
  });
});
