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
  TagSlugsCollectionDocument,
  TagSlugsCollectionQueryVariables,
  TaxonomyCollectionDocument,
  TaxonomyCollectionQueryVariables,
  // TagDefaultFragment,
  // TaxonomyDefaultFragment,
  // Tag,
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
>(queryDocument: TDocument, queryVariables: TVars) {
  // if (typeof window !== 'undefined') {
  //   throw new Error(
  //     'This function should only be used on the server to keep it out of the client bundle!'
  //   );
  // }

  const { data, error } = await graphQLRequestClient
    // @ts-expect-error query variables typed by graphQLRequest
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
  const { recipeCollection } = await graphQLRequest(
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
  const { recipeCollection } = await graphQLRequest(
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
  const { taxonomyCollection } = await graphQLRequest(
    TaxonomyCollectionDocument,
    queryVariables
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

// TODO: create unique query to find tags applied to recipes
export const queryTagSlugs = async (
  queryVariables: TagSlugsCollectionQueryVariables
) => {
  const { tagCollection } = await graphQLRequest(
    TagSlugsCollectionDocument,
    queryVariables
  );

  // tagCollection {
  //   total
  //   items {
  //     slug
  //     linkedFrom {
  //       recipeCollection {
  //         total
  //       }
  //     }
  //   }
  // }

  // TODO: add filter to find if linkedFrom.recipeCollection.total > 0
  // const hasRecipes = ({ item }: { item: Tag }) => {
  //   const { total } = item?.linkedFrom?.recipeCollection ?? {};

  //   return total ? total > 0 : false;
  // };

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

// TODO: check that this query returns only one tag, not all
export const queryListPageContent = async (
  queryVariables: ListPageQueryQueryVariables
) => {
  const { tagCollection } = await graphQLRequest(
    ListPageQueryDocument,
    queryVariables
  );

  return tagCollection ? tagCollection.items.filter(notNullOrUndefined) : [];
};

export const queryNavContent = async (
  queryVariables: TaxonomyCollectionQueryVariables
) => {
  const { taxonomyCollection } = await graphQLRequest(
    TaxonomyCollectionDocument,
    queryVariables
  );

  return taxonomyCollection
    ? taxonomyCollection.items.filter(notNullOrUndefined)
    : [];
};
