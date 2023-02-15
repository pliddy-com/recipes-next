import Head from 'next/head';

import config from 'lib/config';
import { useRouter } from 'next/router';
import { ImageDefaultFragment } from 'types/generated/graphql';

interface PageHeadTagProps {
  title?: string | null;
  defaultTitle?: string;
  description?: string;
  image?: ImageDefaultFragment | null;
}

const PageHeadTag = ({
  title,
  defaultTitle,
  description,
  image,
}: PageHeadTagProps) => {
  const { asPath } = useRouter();
  const { site, index } = config?.microcopy ?? {};
  const { title: siteTitle, domain } = site ?? {};
  const { description: defaultDescription } = index ?? {};

  const imgWidth = 800;
  const imgHeight = 320;
  const locale = 'en_US';
  const tagDescription = description || defaultDescription;
  const tagTitle = title || defaultTitle;
  const type = image ? 'article' : 'website';
  const url = `${domain}${asPath}`;

  const canonicalPath = asPath.includes('category')
    ? `${asPath.replace('category', 'tag')}`
    : `${asPath}`;

  const canonicalUrl = `${domain}${canonicalPath}`;

  return siteTitle || defaultTitle || description || defaultDescription ? (
    <Head>
      {siteTitle && tagTitle && <title>{`${siteTitle} | ${tagTitle}`}</title>}
      {tagDescription && <meta name="description" content={tagDescription} />}

      <meta property="og:description" content={tagDescription} />

      {image && image.url && (
        <meta
          property="og:image"
          content={`${image.url}?w=${imgWidth}&h=${imgHeight}`}
        />
      )}
      {image && image.description && (
        <meta property="og:image:alt" content={image.description} />
      )}
      {image && <meta property="og:image:height" content={`${imgHeight}`} />}
      {image && <meta property="og:image:width" content={`${imgWidth}`} />}
      {image && <meta property="og:image:type" content="image/jpeg" />}

      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={tagTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  ) : null;
};

export default PageHeadTag;
