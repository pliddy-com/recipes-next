import Head from 'next/head';

import config from 'lib/config';
import { ImageDefaultFragment } from 'types/queries';
import { useRouter } from 'next/router';

interface PageTagsProps {
  canonicalPath?: string;
  defaultTitle?: string;
  description?: string;
  image?: ImageDefaultFragment | null;
  title?: string | null;
}

const PageTags = ({
  canonicalPath,
  defaultTitle,
  description,
  image,
  title
}: PageTagsProps) => {
  const { site, index } = config?.microcopy ?? {};
  const { title: siteTitle } = site ?? {};
  const { description: defaultDescription } = index ?? {};

  const tagDescription = description || defaultDescription;
  const tagTitle = title || defaultTitle;

  const { asPath } = useRouter();

  const type = image ? 'article' : 'website';

  const imgWidth = 750;
  const imgHeight = 300;
  const locale = 'en_US';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const url = `${siteUrl}${asPath}`;

  const canonicalUrl = `${siteUrl}${canonicalPath || asPath}`;

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

export default PageTags;
