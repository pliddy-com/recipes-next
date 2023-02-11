import { TypedDocumentNode, createClient } from 'urql';
import { print } from 'graphql';
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

const gqlClient = createClient({
  url: API_ENDPOINT,
  fetchOptions: () => ({
    headers: { authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '' },
  }),
});

export async function queryGraphQLContent<
  TDocument extends TypedDocumentNode<
    ResultOf<TDocument>,
    VariablesOf<TDocument>
  >,
  TVars = TDocument extends unknown ? never : VariablesOf<TDocument>
>(document: TDocument, variables: TVars) {
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
