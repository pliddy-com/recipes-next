import Head from 'next/head';

import config from 'lib/config';

interface PageTitleProps {
  title?: string | null;
  defaultTitle?: string;
  description?: string;
}

const PageHeadTag = ({ title, defaultTitle, description }: PageTitleProps) => {
  const { description: defaultDescription } = config?.microcopy?.index ?? {};
  const { title: siteTitle } = config?.microcopy?.site ?? {};

  return (
    <Head>
      <title>{`${siteTitle} ${
        title || defaultTitle ? `| ${title || defaultTitle}` : ''
      }`}</title>
      <meta
        name="description"
        content={description ? description : defaultDescription}
      />
    </Head>
  );
};

export default PageHeadTag;
