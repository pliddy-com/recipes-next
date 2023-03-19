import Head from 'next/head';
import { TagDefaultFragment } from 'types/queries';
import config from 'lib/config';

interface TagListSchemaProps {
  tags: (TagDefaultFragment | null)[];
  title?: string | null;
  description?: string | null;
}

const TagListSchema = ({ tags, title, description }: TagListSchemaProps) => {
  if (!tags) return null;

  const domain = config?.microcopy?.site.domain;

  const elements =
    tags &&
    tags.map((tag, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tag?.title,
      url: `${domain}/tag/${tag?.slug}`
    }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(title && { name: title }),
    ...(description && { description }),
    url: domain,
    numberOfItems: tags.length,
    ...(title && { name: title }),
    itemListElement: elements
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        id="tag-list-schema"
        data-testid="tag-list-schema"
      />
    </Head>
  );
};

export default TagListSchema;
