import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import PageHeadTag from './PageHeadTag';

import config from 'lib/config';
import { ImageDefaultFragment } from 'types/generated/graphql';

jest.mock('lib/config');
jest.mock('next/head');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/route',
      pathname: '/path',
      query: '',
      asPath: '',
    };
  },
}));

describe('PageHeadingTag', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is a config object', () => {
    it('it renders a Next Head tag with a title and description', () => {
      const title = 'Test Title';
      const description = 'Decription';
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
        url: 'https://image.url',
        height: 300,
        width: 400,
      };

      const { container } = render(
        <PageHeadTag title={title} description={description} image={image} />
      );

      const titleTag = document.getElementsByTagName('title')[0];

      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(title));

      const descriptionTag = document.querySelector(
        `meta[content="${description}"]`
      );

      expect(descriptionTag).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });

    it('it renders a Next Head tag with a default title and description', () => {
      const defaultTitle = config?.microcopy?.site?.title;
      const defaultDescription = config?.microcopy?.index?.description;

      render(<PageHeadTag defaultTitle={defaultTitle} />);

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

      render(<PageHeadTag />);

      const titleTag = document.getElementsByTagName('title')[0];
      const descriptionTag = document.querySelector(
        `meta[content="${defaultDescription}"]`
      );

      expect(titleTag).toBeUndefined();
      expect(descriptionTag).toBeInTheDocument();
    });
  });

  describe('when there is no config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render', () => {
      // no tags props, so should return null
      render(<PageHeadTag />);

      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeUndefined();
    });
  });
});
