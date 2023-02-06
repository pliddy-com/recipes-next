import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import PageHeadTag from './PageHeadTag';

// set up mock next head component
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

// import config object to mock
const config = jest.requireMock('lib/config');

// set up default mock config object
jest.mock('lib/config', () => ({
  microcopy: {
    index: {
      description: 'Mock Config Default Description',
    },
    site: {
      title: 'Mock Config Site Title',
    },
  },
}));

describe('PageHeadingTag', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is a config object', () => {
    it('renders a Next Head tag with a title and description', async () => {
      const title = 'Test Title';
      const description = 'Decription';

      render(<PageHeadTag title={title} description={description} />);

      const titleTag = document.getElementsByTagName('title')[0];

      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(title));

      const descriptionTag = document.querySelector(
        `meta[content="${description}"]`
      );
      expect(descriptionTag).toBeInTheDocument();
    });

    it('renders a Next Head tag with a default title and description', async () => {
      const defaultTitle = config.microcopy.site.title;
      const defaultDescription = config.microcopy.index.description;

      render(<PageHeadTag defaultTitle={defaultTitle} />);

      const titleTag = document.getElementsByTagName('title')[0];

      expect(titleTag).toBeInTheDocument();
      expect(titleTag.text.includes(defaultTitle));

      const descriptionTag = document.querySelector(
        `meta[content="${defaultDescription}"]`
      );
      expect(descriptionTag).toBeInTheDocument();
    });

    it('renders a Next Head tag if no values defaults are passed', async () => {
      const defaultDescription = config.microcopy.index.description;

      render(<PageHeadTag />);

      const titleTag = document.getElementsByTagName('title')[0];
      const descriptionTag = document.querySelector(
        `meta[content="${defaultDescription}"]`
      );

      expect(titleTag).toBeUndefined();
      expect(descriptionTag).toBeInTheDocument();
    });
  });

  describe('when there is a config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('does not render if there is no title or description values in config', async () => {
      // no tags props, so should return null
      render(<PageHeadTag />);

      const titleTag = document.getElementsByTagName('title')[0];
      expect(titleTag).toBeUndefined();
    });
  });
});
