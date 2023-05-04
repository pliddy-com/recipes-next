/* istanbul ignore file */
import { TypedDocumentNode, createClient } from 'urql';
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const API_ENDPOINT = process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_API;

export const gqlClient = createClient({
  url: API_ENDPOINT || '',
  fetchOptions: () => ({
    headers: { authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '' }
  })
});

export async function queryGraphQLContent<
  TDoc extends TypedDocumentNode<ResultOf<TDoc>, VariablesOf<TDoc>>,
  TVars = TDoc extends unknown ? never : VariablesOf<TDoc>
>(document: TDoc, variables?: TVars) {
  const { data, error } = await gqlClient
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
