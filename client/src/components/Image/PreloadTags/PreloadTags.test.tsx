import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import PreloadTags from './PreloadTags';

jest.mock('next/head');

describe('PreloadTags', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when props and url are provided', () => {
    const url = 'https://URL.test';
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

    const defaultWidth = breakpoints[0].imgWidth;

    it('it renders a set of preload link tags in a Head component', () => {
      const expectedImageSizes = '300px';

      const { asFragment } = render(
        <PreloadTags
          breakpoints={breakpoints}
          defaultWidth={defaultWidth}
          url={url}
        />
      );

      // returns 1 tag for each element in props
      const linkTags = document.getElementsByTagName('link');
      expect(linkTags.length === breakpoints.length).toBe(true);

      // expect url & imageSizes tags to be created
      const testTag = linkTags[0];
      expect(testTag.textContent?.includes(url));
      expect(testTag.textContent?.includes(expectedImageSizes));

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when props and url are provided', () => {
    it('it does not render', () => {
      render(
        <PreloadTags
          aspectRatio="4 / 3"
          breakpoints={[]}
          defaultWidth={0}
          url={null as unknown as string}
        />
      );

      const linkTags = document.getElementsByTagName('link');

      expect(linkTags.length).toBe(0);
    });
  });
});
