import Head from 'next/head';

import config from 'lib/config';

interface PageTitleProps {
  title?: string | null;
  defaultTitle?: string;
  description?: string;
}

const PageHeadTag = ({ title, defaultTitle, description }: PageTitleProps) => {
  const { site, index } = config?.microcopy ?? {};
  const { title: siteTitle } = site ?? {};
  const { description: defaultDescription } = index ?? {};

  return siteTitle || defaultTitle || description || defaultDescription ? (
    <Head>
      {siteTitle && (title || defaultTitle) && (
        <title>{`${siteTitle} | ${title || defaultTitle}`}</title>
      )}
      {(description || defaultDescription) && (
        <meta
          name="description"
          content={description ? description : defaultDescription}
        />
      )}
    </Head>
  ) : null;
};

export default PageHeadTag;
