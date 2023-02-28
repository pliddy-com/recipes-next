import Head from 'next/head';
import { RecipeDefaultFragment } from 'types/queries';

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

  TODO: add recipeCategory to content definition
    "recipeCategory": "Dessert",

  TODO: add cuisine to content definition or use a cuisine taxonomy to App context
    "recipeCuisine": "American",

*/

interface SchemaProps {
  recipe: RecipeDefaultFragment;
}

const RecipeSchema = ({ recipe }: SchemaProps) => {
  const {
    abstract,
    image,
    ingredientsCollection,
    instructionsCollection,
    sys: { firstPublishedAt },
    title,
  } = recipe ?? {};

  const { url: imageUrl } = image ?? {};

  const { items: ingredientSections } = ingredientsCollection ?? {};
  const { items: instructionsSections } = instructionsCollection ?? {};

  const ingredients = ingredientSections?.map((section) =>
    section?.ingredientList?.map((item) => `"${item}"`)
  );

  let instructionStep = 1;

  const instructions = instructionsSections?.map(
    (section) =>
      `{
        "@type": "HowToSection",
        "name": "${section?.label}",
        "itemListElement": [
          ${section?.instructionList?.map(
            (item) => `{
            "@type": "HowToStep",
            "name": "${section?.label} Step ${instructionStep++}",
            "text": "${item}"
          }`
          )}
        ]
      }`
  );

  // Google recommends providing multiple high-resolution images (50K pixels min.)
  //  with the following aspect ratios: 16x9, 4x3, and 1x1. 252 height works for all aspect ratios
  const imgHeight = 252;

  const schema = `{
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "${title}",
    "image": [
      "${imageUrl}?w=${imgHeight}&h=${imgHeight}&fit=fill&fm=webp&q=75",
      "${imageUrl}?w=${
    (imgHeight / 3) * 4
  }&h=${imgHeight}&fit=fill&fm=webp&q=75",
      "${imageUrl}?w=${
    (imgHeight / 9) * 16
  }&h=${imgHeight}&fit=fill&fm=webp&q=75"
    ],
    "author": {
      "@type": "Person",
      "name": "Patrick Liddy"
    },
    "datePublished": "${firstPublishedAt.split('T')[0]}",
    "description": "${abstract}",
    "recipeIngredient": [
      ${ingredients}
    ],
    "recipeInstructions": [
      ${instructions}
    ]
  }`;

  return (
    <Head>
      <script type="application/ld+json">{schema}</script>
    </Head>
  );
};

export default RecipeSchema;
