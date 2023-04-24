import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import PageTags from './PageTags';

import config from 'lib/config';
import { ImageDefaultFragment } from 'types/queries';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/route',
    pathname: '/path',
    asPath: '/tag/path'
  })
}));

const env = process.env;

describe('PageTags', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...env,
      NEXT_PUBLIC_SITE_URL: 'https://test.recipes.pliddy.com'
    };
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when there is a config object', () => {
    it('it renders a Next Head tag with a title and description', () => {
      const title = 'Test Title';
      const description = 'Decription';
      const image: ImageDefaultFragment = {
        __typename: 'Asset',
        title: 'Image Title',
        description: 'Image Description',
        contentType: 'image/jpeg',
        fileName: 'imageFileName.jpg',
        size: 999999,
        url: 'https://image.url',
        height: 300,
        width: 400
      };

      const { asFragment } = render(
        <PageTags title={title} description={description} image={image} />
      );

      const titleTag = document.getElementsByTagName('title')[0];

      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(title));

      const descriptionTag = document.querySelector(
        `meta[content="${description}"]`
      );

      expect(descriptionTag).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });

    it('it renders a Next Head tag with a default title and description', () => {
      const defaultTitle = config?.microcopy?.site?.title;
      const defaultDescription = config?.microcopy?.index?.description;

      render(<PageTags defaultTitle={defaultTitle} />);

      const titleTag = document.getElementsByTagName('title')[0];

      expect(titleTag).toBeInTheDocument();
      defaultTitle && expect(titleTag.text.includes(defaultTitle));

      const descriptionTag = document.querySelector(
        `meta[content="${defaultDescription}"]`
      );

      expect(descriptionTag).toBeInTheDocument();
    });

    it('it renders a Next Head tag if no values defaults are passed', () => {
      const defaultDescription = config?.microcopy?.index?.description;

      render(<PageTags />);

      const titleTag = document.getElementsByTagName('title')[0];
      const descriptionTag = document.querySelector(
        `meta[content="${defaultDescription}"]`
      );

      expect(titleTag).toBeUndefined();
      expect(descriptionTag).toBeInTheDocument();
    });

    describe('when there is no rewrite', () => {
      it('it renders the component if there is no rewrite', () => {
        (useRouter as jest.Mock).mockReturnValueOnce({
          route: '/route',
          pathname: '/path',
          asPath: '/tags/path'
        });

        const title = 'Test Title';
        const description = 'Decription';

        render(<PageTags title={title} description={description} />);

        const titleTag = document.getElementsByTagName('title')[0];

        const descriptionTag = document.querySelector(
          `meta[content="${description}"]`
        );

        expect(descriptionTag).toBeInTheDocument();
        expect(titleTag).toBeInTheDocument();
      });
    });
  });

  describe('when there is no config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render', () => {
      // no tags props, so should return null
      render(<PageTags />);

      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeUndefined();
    });
  });
});
