// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the functions to test
import { createSrcSet, createMediaQuery } from './responsiveImage';

describe('In responsiveImages.tsx', () => {
  describe('createSrcSet()', () => {
    it('returns a correctly formatted srcSet string', () => {
      const url = 'https://URL.test';
      const imgWidth = 1000;
      const expected =
        'https://URL.test?w=1000&fm=webp&q=75 1x, https://URL.test?w=2000&fm=webp&q=75 2x';

      const srcSet = createSrcSet({ url, imgWidth });

      expect(srcSet).toEqual(expected);
    });
  });

  describe('createMediaQuery()', () => {
    const viewMin = 1000;

    // comes from config
    const propList = [
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

    it('returns a correctly formatted mediaQuery string for the first image in the propList', () => {
      const index = 0;
      const expected = '(min-width: 1000px)';

      expect(createMediaQuery({ viewMin, index, propList })).toEqual(expected);
    });

    it('returns a correctly formatted mediaQuery string for the last image in the propList', () => {
      const index = propList.length - 1;
      const expected = '(max-width: 499px)';

      expect(createMediaQuery({ viewMin, index, propList })).toEqual(expected);
    });

    it('returns a correctly formatted mediaQuery string for and image in the middle of the propList', () => {
      const index = 1;
      const expected = '(min-width: 1000px) and (max-width: 999px)';

      expect(createMediaQuery({ viewMin, index, propList })).toEqual(expected);
    });
  });
});
