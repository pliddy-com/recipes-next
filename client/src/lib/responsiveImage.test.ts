// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the functions to test
import { createSrcSet, createMediaQuery } from './responsiveImage';

describe('responsiveImage', () => {
  describe('when createSrcSet() is called', () => {
    it('it returns a correctly formatted srcSet string', () => {
      const url = 'https://URL.test';
      const imgWidth = 1000;
      const expected =
        'https://URL.test?w=1000&h=750&fit=fill&fm=webp&q=75 1x, https://URL.test?w=2000&h=1500&fit=fill&fm=webp&q=75 2x';

      const srcSet = createSrcSet({ url, imgWidth });

      expect(srcSet).toEqual(expected);
    });
  });

  describe('when createMediaQuery() is called', () => {
    const viewMin = 1000;

    // use 3 sets of props for min, max, and at least one in between
    const breakpoints = [
      {
        viewMin: 1000,
        imgWidth: 300
      },
      {
        viewMin: 500,
        imgWidth: 200
      },
      {
        imgWidth: 100
      }
    ];

    it('it returns a correctly formatted mediaQuery string for the first image in the breakpoints', () => {
      const index = 0;
      const expected = '(min-width: 1000px)';

      expect(createMediaQuery({ viewMin, index, breakpoints })).toEqual(
        expected
      );
    });

    it('it returns a correctly formatted mediaQuery string for the last image in the breakpoints', () => {
      const index = breakpoints.length - 1;
      const expected = '(max-width: 499px)';

      expect(createMediaQuery({ viewMin, index, breakpoints })).toEqual(
        expected
      );
    });

    it('it returns a correctly formatted mediaQuery string for and image in the middle of the breakpoints', () => {
      const index = 1;
      const expected = '(min-width: 1000px) and (max-width: 999px)';

      expect(createMediaQuery({ viewMin, index, breakpoints })).toEqual(
        expected
      );
    });
  });
});
