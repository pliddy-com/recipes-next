import Head from 'next/head';
import { RecipeDefaultFragment } from 'types/queries';

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const elements =
    recipes &&
    recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: recipe?.title,
      url: `${siteUrl}/recipe/${recipe?.slug}`
    }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(title && { name: title }),
    ...(description && { description }),
    url: siteUrl,
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
