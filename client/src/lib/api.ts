import { queryGraphQLContent } from 'lib/gqlClient';

import {
  filterSlugs,
  filterTagsWithRecipes,
  filterTaxonomyItemsWithRecipes
} from './apiFilters';

import {
  NavMenuDataDocument,
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
  TagCollection,
  RecipeDefaultFragment,
  TagDefaultFragment
} from 'types/queries';

import { hasValue } from 'lib/utils';

// used to query content for nav menu taxonomy on client layout
export const getNavTaxonomy = async () => {
  const { categories, cuisine, tags } = await queryGraphQLContent(
    NavMenuDataDocument
  );

  return {
    ...(categories && {
      categories: filterTaxonomyItemsWithRecipes(categories)
    }),
    ...(cuisine && { cuisine: filterTaxonomyItemsWithRecipes(cuisine) }),
    ...(tags && {
      tags: filterTagsWithRecipes({ tagCollection: tags as TagCollection })
    })
  };
};

// used by getStaticProps for recipe page
export const getRecipeSlugs = async (variables: RecipeSlugsQueryVariables) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeSlugsDocument,
    variables
  );

  return recipeCollection
    ? filterSlugs(recipeCollection?.items as RecipeDefaultFragment[])
    : [];
};

// used by getStaticProps for tag page
export const getTagSlugs = async (variables?: TagSlugsQueryVariables) => {
  const { tagCollection } = await queryGraphQLContent(
    TagSlugsDocument,
    variables
  );

  const tags = filterTagsWithRecipes({
    tagCollection: tagCollection as TagCollection
  });

  return tags ? filterSlugs(tags as TagDefaultFragment[]) : [];
};

// used to query content for home index page
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
  const { recipeCollection, categoriesTaxonomy, cuisineTaxonomy } =
    await queryGraphQLContent(RecipePageDocument, variables);

  const categories =
    categoriesTaxonomy?.items.filter(hasValue)[0].childrenCollection?.items;

  const cuisine =
    cuisineTaxonomy?.items.filter(hasValue)[0].childrenCollection?.items;

  const recipe = recipeCollection?.items.filter(hasValue)[0];

  return {
    ...(recipe && { recipe }),
    ...(categories && { categories }),
    ...(cuisine && { cuisine })
  };
};

// used to query content for tag index page
export const getTagIndex = async (variables?: RecipeListQueryVariables) => {
  const { tagCollection } = await queryGraphQLContent(
    RecipeListDocument,
    variables
  );

  return tagCollection
    ? filterTagsWithRecipes({
        tagCollection: tagCollection as TagCollection
      })
    : [];
};
