import Head from 'next/head';
import { RecipeDefaultFragment } from 'types/queries';
import config from 'lib/config';

interface RecipeListSchemaProps {
  recipes: (RecipeDefaultFragment | null)[];
  title?: string | null;
  description?: string | null;
}

const RecipeListSchema = ({
  recipes,
  title,
  description
}: RecipeListSchemaProps) => {
  if (!recipes) return null;

  const domain = config?.microcopy?.site.domain;

  const elements =
    recipes &&
    recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: recipe?.title,
      url: `${domain}/recipe/${recipe?.slug}`
    }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(title && { name: title }),
    ...(description && { description }),
    url: domain,
    numberOfItems: recipes.length,
    ...(title && { name: title }),
    itemListElement: elements
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        id="recipe-list-schema"
        data-testid="recipe-list-schema"
      />
    </Head>
  );
};

export default RecipeListSchema;
