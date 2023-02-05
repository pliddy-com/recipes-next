import {
  render,
  // screen,
  // waitFor
} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import PageHeadTag from './PageHeadTag';
import { microcopy } from 'lib/config';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

jest.mock('lib/config');

describe('PageHeadingTag', () => {
  beforeEach(() => {
    jest.resetModules();
  });

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
    const defaultTitle = microcopy.site.title;
    const defaultDescription = microcopy.index.description;

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
    const defaultDescription = microcopy.index.description;

    render(<PageHeadTag />);

    const titleTag = document.getElementsByTagName('title')[0];
    const descriptionTag = document.querySelector(
      `meta[content="${defaultDescription}"]`
    );

    expect(titleTag).toBeUndefined();
    expect(descriptionTag).toBeInTheDocument();
  });

  // TODO: needs to override config object with null
  it('does not render if there is no title or description values in config', async () => {
    // no tags props, so should return null

    render(<PageHeadTag />);

    const titleTag = document.getElementsByTagName('title')[0];
    expect(titleTag).toBeUndefined();
  });
});
