import { fetchContent, queryGraphQLContent } from './clients';
import {
  RecipeCollectionDocument,
  RecipeCollectionQueryVariables,
  RecipePageDocument,
  RecipePageQueryVariables,
  RecipeSlugsCollectionDocument,
  RecipeSlugsCollectionQueryVariables,
  ListPageQueryDocument,
  ListPageQueryQueryVariables,
  TagSlugsCollectionDocument,
  TagSlugsCollectionQueryVariables,
  TaxonomyCollectionDocument,
  TaxonomyCollectionQueryVariables,
} from 'types/generated/graphql';

import { notNullOrUndefined } from 'lib/typeUtils';

// used to query content for nav menu taxonomy
export const fetchNavContent = async (
  variables: TaxonomyCollectionQueryVariables
) => {
  const { taxonomyCollection } = await fetchContent(
    TaxonomyCollectionDocument,
    variables
  );

  return taxonomyCollection
    ? taxonomyCollection.items.filter(notNullOrUndefined)
    : [];
};

// GRAPHQL requests

// used to query content for  home index page
export const queryRecipeCollectionContent = async (
  variables?: RecipeCollectionQueryVariables
) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeCollectionDocument,
    variables
  );

  return recipeCollection
    ? recipeCollection.items.filter(notNullOrUndefined)
    : [];
};

// used to query content for tag & category pagepage
export const queryListPageContent = async (
  variables: ListPageQueryQueryVariables
) => {
  const { tagCollection } = await queryGraphQLContent(
    ListPageQueryDocument,
    variables
  );

  return tagCollection ? tagCollection.items.filter(notNullOrUndefined) : [];
};

// used to query content for standalone recipe page
export const queryRecipeContent = async (
  variables?: RecipePageQueryVariables
) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipePageDocument,
    variables
  );

  return recipeCollection
    ? recipeCollection.items.filter(notNullOrUndefined)
    : [];
};

// used by getStaticProps for recipe page
export const queryPageSlugs = async (
  variables: RecipeSlugsCollectionQueryVariables
) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeSlugsCollectionDocument,
    variables
  );

  const results = recipeCollection?.items?.map((child) => {
    const { slug } = child ?? {};
    return slug;
  });

  return results ? results?.filter(notNullOrUndefined) : [];
};

// used by getStaticProps for category page
export const queryCategorySlugs = async (
  variables: TaxonomyCollectionQueryVariables
) => {
  const { taxonomyCollection } = await queryGraphQLContent(
    TaxonomyCollectionDocument,
    variables
  );

  const { items } = taxonomyCollection?.items[0]?.childrenCollection ?? {};

  const results = items
    ?.map((child) => {
      const { slug } = child ?? {};

      if (child?.__typename === 'Taxonomy') {
        const children = child?.childrenCollection?.items?.map(
          (childItem) => childItem?.slug
        );

        children?.push(slug);

        return children;
      }

      return slug;
    })
    .flat();

  return results ? results?.filter(notNullOrUndefined) : [];
};

// used by getStaticProps for tag page
export const queryTagSlugs = async (
  variables: TagSlugsCollectionQueryVariables
) => {
  const { tagCollection } = await queryGraphQLContent(
    TagSlugsCollectionDocument,
    variables
  );

  const filtered = tagCollection?.items
    .filter(notNullOrUndefined)
    .filter(
      (item) =>
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0
    );

  const results = filtered?.map((child) => {
    const { slug } = child ?? {};
    return slug;
  });

  return results ? results?.filter(notNullOrUndefined) : [];
};
