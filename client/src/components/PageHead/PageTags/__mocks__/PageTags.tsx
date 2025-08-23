// Mock modules for npm packages are in the __mocks__ directory
// at the root level as a sibling of node_modules
import Head from 'next/head';
import { ImageDefaultFragment } from 'types/queries';

// create mock version of npm package

interface PageTagsProps {
  title?: string | null;
  defaultTitle?: string;
  description?: string;
  image?: ImageDefaultFragment | null;
}

export const PageTags = jest.fn(
  ({ title, defaultTitle, description, image }: PageTagsProps) => {
    return (
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description} />

        {image && (
          <meta property="og:image" content={`${image.url}?w=400&h=300`} />
        )}
      </Head>
    );
  }
);

export default PageTags;
