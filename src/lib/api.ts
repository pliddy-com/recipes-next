import { queryGraphQLContent } from 'lib/gqlClient';

import {
  NavTaxonomyDocument,
  NavTaxonomyQueryVariables,
  RecipeIndexDocument,
  RecipeIndexQueryVariables,
  RecipeListDocument,
  RecipeListQueryVariables,
  RecipePageDocument,
  RecipePageQueryVariables,
  RecipeSlugsDocument,
  RecipeSlugsQueryVariables,
  TagSlugsDocument,
  TagSlugsQueryVariables,
} from 'types/generated/graphql';

import { hasValue } from 'lib/typeUtils';

// TODO: add try/catch to handle errors

// used to query content for nav menu taxonomy on client layout
export const getNavTaxonomy = async (variables: NavTaxonomyQueryVariables) => {
  const { taxonomyCollection } = await queryGraphQLContent(
    NavTaxonomyDocument,
    variables
  );

  return taxonomyCollection ? taxonomyCollection.items.filter(hasValue) : [];
};

// used by getStaticProps for recipe page
export const getRecipeSlugs = async (variables: RecipeSlugsQueryVariables) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeSlugsDocument,
    variables
  );

  const results = recipeCollection?.items?.map((child) => {
    const { slug } = child ?? {};
    return slug;
  });

  return results ? results?.filter(hasValue) : [];
};

// used by getStaticProps for tag page
export const getTagSlugs = async (variables: TagSlugsQueryVariables) => {
  const { tagCollection } = await queryGraphQLContent(
    TagSlugsDocument,
    variables
  );

  const filtered = tagCollection?.items
    .filter(hasValue)
    .filter(
      (item) =>
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0
    );

  const results = filtered?.map((child) => {
    const { slug } = child ?? {};
    return slug;
  });

  return results ? results?.filter(hasValue) : [];
};

// used to query content for  home index page
export const getRecipeIndex = async (variables?: RecipeIndexQueryVariables) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeIndexDocument,
    variables
  );

  return recipeCollection ? recipeCollection.items.filter(hasValue) : [];
};

// used to query content for tag & category pagepage
export const getRecipeList = async (variables: RecipeListQueryVariables) => {
  const { tagCollection } = await queryGraphQLContent(
    RecipeListDocument,
    variables
  );

  return tagCollection ? tagCollection.items.filter(hasValue) : [];
};

// used to query content for standalone recipe page
export const getRecipePage = async (variables?: RecipePageQueryVariables) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipePageDocument,
    variables
  );

  return recipeCollection ? recipeCollection.items.filter(hasValue) : [];
};
