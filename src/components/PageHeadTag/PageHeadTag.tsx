import Head from 'next/head';

import { microcopy } from 'lib/config';

interface PageTitleProps {
  title?: string | null;
  defaultTitle?: string;
  description?: string;
}

const PageHeadTag = ({ title, defaultTitle, description }: PageTitleProps) => {
  // console.log({ microcopy });

  const { site, index } = microcopy ?? {};
  const { title: siteTitle } = site ?? {};
  const { description: defaultDescription } = index ?? {};

  // console.log({
  //   title,
  //   defaultTitle,
  //   description,
  //   defaultDescription,
  //   siteTitle,
  // });

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
