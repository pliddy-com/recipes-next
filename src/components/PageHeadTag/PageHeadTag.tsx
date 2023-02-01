import Head from 'next/head';

interface PageTitleProps {
  title?: string | null;
  defaultTitle?: string;
}

// TODO: Add description for home, category, tag, and recipe

const PageHeadTag = ({ title, defaultTitle }: PageTitleProps) => (
  <Head>
    <title>{`Patrick's Recipes${
      title || defaultTitle ? ` | ${title || defaultTitle}` : ''
    }`}</title>
    <meta name="description" content="Patrick's personal recipe collection" />
  </Head>
);

export default PageHeadTag;
