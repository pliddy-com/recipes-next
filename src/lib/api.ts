import { createClient, TypedDocumentNode } from 'urql';
import { print } from 'graphql';

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
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// TODO: move whole string to .env
const API_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`;

const graphQLRequestClient = createClient({
  url: API_ENDPOINT,
  fetchOptions: () => ({
    headers: { authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '' },
  }),
});

export async function graphQLRequest<
  TDocument extends TypedDocumentNode<
    ResultOf<TDocument>,
    VariablesOf<TDocument>
  >,
  TVars = TDocument extends unknown ? never : VariablesOf<TDocument>
>(document: TDocument, variables: TVars) {
  if (typeof window !== 'undefined') {
    throw new Error(
      'This function in only used for Server Side Rendering. Use `fetch` for client side requests.'
    );
  }

  const { data, error } = await graphQLRequestClient
    // @ts-expect-error query variables are typed by graphQLRequest
    .query(document, variables)
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }
    throw new Error('No data returned');
  }

  return data;
}

// use fetch for nav query instead of the gql client to minimize browser bundle size
export async function fetchContent<
  TDocument extends TypedDocumentNode<
    ResultOf<TDocument>,
    VariablesOf<TDocument>
  >,
  TVars = TDocument extends unknown ? never : VariablesOf<TDocument>
>(document: TDocument, variables: TVars) {
  try {
    const response = await window.fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '',
      },
      // send the GraphQL query
      body: JSON.stringify({ query: print(document), variables }),
    });

    const { data } = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
}

// used to query content for nav menu taxonomy
export const queryNavContent = async (
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

// used to query content for  home index page
export const queryRecipeCollectionContent = async (
  variables?: RecipeCollectionQueryVariables
) => {
  const { recipeCollection } = await graphQLRequest(
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
  const { tagCollection } = await graphQLRequest(
    ListPageQueryDocument,
    variables
  );

  return tagCollection ? tagCollection.items.filter(notNullOrUndefined) : [];
};

// used to query content for standalone recipe page
export const queryRecipeContent = async (
  variables?: RecipePageQueryVariables
) => {
  const { recipeCollection } = await graphQLRequest(
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
  const { recipeCollection } = await graphQLRequest(
    RecipeSlugsCollectionDocument,
    variables
  );

  return recipeCollection
    ? recipeCollection.items.filter(notNullOrUndefined)
    : [];
};

// used by getStaticProps for category page
export const queryCategorySlugs = async (
  variables: TaxonomyCollectionQueryVariables
) => {
  const { taxonomyCollection } = await graphQLRequest(
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
  const { tagCollection } = await graphQLRequest(
    TagSlugsCollectionDocument,
    variables
  );

  return tagCollection
    ? tagCollection.items
        .filter(notNullOrUndefined)
        .filter(
          (item) =>
            item?.linkedFrom?.recipeCollection?.total &&
            item?.linkedFrom?.recipeCollection?.total > 0
        )
    : [];
};
