import Head from 'next/head';
import {
  RecipeDefaultFragment,
  TagDefaultFragment,
  TaxonomyDefaultFragment,
} from 'types/queries';

/*
  
  The remaining schema properties do not have equivalent fields in the Recipe content model

  TODO: define structure of prepTime, cookTime, and totalTime and add to content definition
    "prepTime": "PT20M",
    "cookTime": "PT30M",
    "totalTime": "PT50M",

  TODO: add unique keywords that aren't part of tags
    "keywords": "cake for a party, coffee",

  TODO: add recipeYield to content definition
    "recipeYield": "10",

*/

export interface RecipeSchemaProps {
  recipe: RecipeDefaultFragment;
  categories?: (TaxonomyDefaultFragment | TagDefaultFragment | null)[];
  cuisine?: (TaxonomyDefaultFragment | TagDefaultFragment | null)[];
}

const RecipeSchema = ({ recipe, categories, cuisine }: RecipeSchemaProps) => {
  if (!recipe) return null;

  const {
    abstract,
    image,
    ingredientsCollection,
    instructionsCollection,
    sys,
    tagsCollection,
    title,
  } = recipe;

  const { firstPublishedAt } = sys ?? {};
  const { url: imageUrl } = image ?? {};

  // Google recommends providing multiple high-resolution images (50K pixels min.)
  //  with the following aspect ratios: 16x9, 4x3, and 1x1. 252 height works for all aspect ratios
  const imgHeight = 252;

  const images = [
    `${imageUrl}?w=${imgHeight}&h=${imgHeight}&fit=fill&fm=webp&q=75`,
    `${imageUrl}?w=${(imgHeight / 3) * 4}&h=${imgHeight}&fit=fill&fm=webp&q=75`,
    `${imageUrl}?w=${
      (imgHeight / 9) * 16
    }&h=${imgHeight}&fit=fill&fm=webp&q=75`,
  ];

  const { items: ingredientSections } = ingredientsCollection ?? {};

  const ingredients =
    ingredientSections &&
    ingredientSections?.map((section) =>
      section?.ingredientList?.map((item) => item)
    );

  const { items: instructionsSections } = instructionsCollection ?? {};

  let instructionStep = 1;

  const instructions =
    instructionsSections &&
    instructionsSections?.map((section) => ({
      '@type': 'HowToSection',
      name: section?.label,
      itemListElement: [
        section?.instructionList?.map((item) => ({
          '@type': 'HowToStep',
          name: `${section?.label} Step ${instructionStep++}`,
          text: item,
        })),
      ],
    }));

  const { items: tags } = tagsCollection ?? {};

  const recipeCategory = tags?.find((tag) =>
    categories?.find((category) => category?.slug === tag?.slug)
  );

  const recipeCuisine = tags?.find((tag) =>
    cuisine?.find((item) => item?.slug === tag?.slug)
  );

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    ...(title && { name: title }),
    ...(images && { image: images }),
    author: {
      '@type': 'Person',
      name: 'Patrick Liddy',
    },
    ...(firstPublishedAt && { datePublished: firstPublishedAt.split('T')[0] }),
    ...(abstract && { description: abstract }),
    ...(ingredients && { recipeIngredient: ingredients }),
    ...(instructions && { recipeInstructions: instructions }),
    ...(recipeCategory && { recipeCategory: recipeCategory.title }),
    ...(recipeCuisine && { recipeCuisine: recipeCuisine.title }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        id="recipe-schema"
        data-testid="recipe-schema"
      />
    </Head>
  );
};

export default RecipeSchema;
