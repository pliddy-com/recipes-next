import Head from 'next/head';
import {
  RecipeDefaultFragment,
  TagDefaultFragment,
  TaxonomyDefaultFragment
} from 'types/queries';
import { minToIso } from 'lib/utils';

import { IRecipeSection } from 'types/json';

export interface RecipeSchemaProps {
  recipe: RecipeDefaultFragment;
  categories?: (TaxonomyDefaultFragment | TagDefaultFragment | null)[];
  cuisine?: (TaxonomyDefaultFragment | TagDefaultFragment | null)[];
}

const RecipeSchema = ({ recipe, categories, cuisine }: RecipeSchemaProps) => {
  if (!recipe) return null;

  const {
    abstract,
    cookTime,
    image,
    ingredientsList,
    instructionsList,
    keywords,
    prepTime,
    sys,
    tagsCollection,
    title,
    recipeYield
  } = recipe;

  const { firstPublishedAt } = sys ?? {};
  const { url: imageUrl } = image ?? {};

  // Google recommends providing multiple high-resolution images (50K pixels min.)
  //  with the following aspect ratios: 16x9, 4x3, and 1x1. 252 height works for all aspect ratios
  const imgHeight = 252;

  const images = [
    `${imageUrl}?w=${imgHeight}&h=${imgHeight}&fit=fill&fm=webp&q=75`,
    `${imageUrl}?w=${(imgHeight / 3) * 4}&h=${imgHeight}&fit=fill&fm=webp&q=75`,
    `${imageUrl}?w=${(imgHeight / 9) * 16}&h=${imgHeight}&fit=fill&fm=webp&q=75`
  ];

  const ingredients =
    ingredientsList &&
    ingredientsList?.map((section: IRecipeSection) =>
      section?.sectionItems?.map((item) => item)
    );

  let instructionStep = 1;

  const instructions =
    instructionsList &&
    instructionsList?.map((section: IRecipeSection) => ({
      '@type': 'HowToSection',
      name: section?.sectionTitle,
      itemListElement: [
        section?.sectionItems?.map((item) => ({
          '@type': 'HowToStep',
          name: `${section?.sectionTitle} Step ${instructionStep++}`,
          text: item
        }))
      ]
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
      name: 'Patrick Liddy'
    },
    ...(firstPublishedAt && { datePublished: firstPublishedAt.split('T')[0] }),
    ...(abstract && { description: abstract }),
    ...(recipeYield && { recipeYield }),
    ...(prepTime && { prepTime: minToIso(Number(prepTime)) }),
    ...(cookTime && { prepTime: minToIso(Number(cookTime)) }),
    ...((prepTime || cookTime) && {
      totalTime: minToIso(Number(prepTime) + Number(cookTime))
    }),
    ...(ingredients && { recipeIngredient: ingredients }),
    ...(instructions && { recipeInstructions: instructions }),
    ...(recipeCategory && { recipeCategory: recipeCategory.title }),
    ...(recipeCuisine && { recipeCuisine: recipeCuisine.title }),
    ...(keywords && { keywords })
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
