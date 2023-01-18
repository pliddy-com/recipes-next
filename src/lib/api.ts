import { createClient, TypedDocumentNode } from 'urql';

import {
  RecipeCollectionDocument,
  RecipeCollectionQueryVariables,
  RecipeSlugsCollectionDocument,
  RecipeSlugsCollectionQueryVariables,
} from 'types/generated/graphql';

import { notNullOrUndefined, ResolvedPromise } from 'lib/typeUtils';
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

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

export const queryRecipeContent = async (
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
