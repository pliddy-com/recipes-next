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
  TagDefaultFragment,
  NavMenuDataQuery,
  RecipeSlugsQuery,
  TagSlugsQuery,
  RecipeListQuery
} from 'types/queries';

import { hasValue } from 'lib/utils';

// used to query content for nav menu taxonomy on client layout
export const getNavTaxonomy = async () => {
  const results: NavMenuDataQuery = await queryGraphQLContent(
    NavMenuDataDocument
  );

  const { categories, cuisine, tags } = results;

  return {
    ...(categories && {
      categories: filterTaxonomyItemsWithRecipes({
        taxonomyCollection: categories
      })
    }),
    ...(cuisine && {
      cuisine: filterTaxonomyItemsWithRecipes({ taxonomyCollection: cuisine })
    }),
    ...(tags && {
      tags: filterTagsWithRecipes({ tagCollection: tags })
    })
  };
};

// used by getStaticProps for recipe page
export const getRecipeSlugs = async (variables: RecipeSlugsQueryVariables) => {
  const results: RecipeSlugsQuery = await queryGraphQLContent(
    RecipeSlugsDocument,
    variables
  );

  const { recipeCollection } = results;

  return recipeCollection && recipeCollection.items
    ? filterSlugs(recipeCollection.items)
    : [];
};

// used by getStaticProps for tag page
export const getTagSlugs = async (variables?: TagSlugsQueryVariables) => {
  const results: TagSlugsQuery = await queryGraphQLContent(
    TagSlugsDocument,
    variables
  );

  const { tagCollection } = results;

  const tags =
    tagCollection &&
    filterTagsWithRecipes({
      tagCollection
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
  const results: RecipeListQuery = await queryGraphQLContent(
    RecipeListDocument,
    variables
  );

  const { tagCollection } = results;

  return tagCollection
    ? filterTagsWithRecipes({
        tagCollection
      })
    : [];
};
