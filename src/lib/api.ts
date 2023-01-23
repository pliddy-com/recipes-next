import { createClient, TypedDocumentNode } from 'urql';

import {
  RecipeCollectionDocument,
  RecipeCollectionQueryVariables,
  RecipeSlugsCollectionDocument,
  RecipeSlugsCollectionQueryVariables,
  // CategorySlugsCollectionDocument,
  // CategorySlugsCollectionQueryVariables,
  ListPageQueryDocument,
  ListPageQueryQueryVariables,
  TaxonomyCollectionDocument,
  TaxonomyCollectionQueryVariables,
  // TagDefaultFragment,
  // TaxonomyDefaultFragment,
} from 'types/generated/graphql';

import {
  notNullOrUndefined,
  // ResolvedPromise
} from 'lib/typeUtils';
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';
// import { ConstructionOutlined } from '@mui/icons-material';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const API_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`;

const serverSideGraphQLRequestClient = createClient({
  url: API_ENDPOINT,
  fetchOptions: () => ({
    headers: { authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '' },
  }),
});

export async function serverSideGraphQLRequest<
  TDocument extends TypedDocumentNode<
    ResultOf<TDocument>,
    VariablesOf<TDocument>
  >,
  TVars = TDocument extends unknown ? never : VariablesOf<TDocument>
>(queryDocument: TDocument, queryVariables: TVars) {
  if (typeof window !== 'undefined') {
    throw new Error(
      'This function should only be used on the server to keep it out of the client bundle!'
    );
  }

  const { data, error } = await serverSideGraphQLRequestClient
    // @ts-expect-error query variables typed by serverSideGraphQLRequest
    .query(queryDocument, queryVariables)
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }
    throw new Error('No data returned');
  }

  return data;
}

export const queryRecipeCollectionContent = async (
  queryVariables?: RecipeCollectionQueryVariables
) => {
  const { recipeCollection } = await serverSideGraphQLRequest(
    RecipeCollectionDocument,
    queryVariables
  );

  return recipeCollection
    ? recipeCollection.items.filter(notNullOrUndefined)
    : [];
};

export const queryPageSlugs = async (
  queryVariables: RecipeSlugsCollectionQueryVariables
) => {
  const { recipeCollection } = await serverSideGraphQLRequest(
    RecipeSlugsCollectionDocument,
    queryVariables
  );

  return recipeCollection
    ? recipeCollection.items.filter(notNullOrUndefined)
    : [];
};

export const queryCategorySlugs = async (
  queryVariables: TaxonomyCollectionQueryVariables
) => {
  const { taxonomyCollection } = await serverSideGraphQLRequest(
    TaxonomyCollectionDocument,
    queryVariables
  );

  // console.log(
  //   'taxonomyCollection.items.childrenCollection.items',
  //   taxonomyCollection?.items[0]?.childrenCollection?.items
  // );

  const { items } = taxonomyCollection?.items[0]?.childrenCollection ?? {};

  console.log('items:', items);

  const results = items?.map((child) => {
    const { slug } = child ?? {};

    if (child?.__typename === 'Taxonomy') {
      const children = child?.childrenCollection?.items?.map((childItem) => {
        return childItem?.slug;
      });

      children?.push(slug);

      console.log('children:', children);

      return children;
    }

    console.log('slug:', slug);

    return slug;
  });

  console.log('results:', results?.flat());

  return results ? results?.flat().filter(notNullOrUndefined) : [];
};

export const queryListPageContent = async (
  queryVariables: ListPageQueryQueryVariables
) => {
  const { tagCollection } = await serverSideGraphQLRequest(
    ListPageQueryDocument,
    queryVariables
  );

  return tagCollection ? tagCollection.items.filter(notNullOrUndefined) : [];
};
