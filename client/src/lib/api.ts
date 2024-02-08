/* istanbul ignore file */

import * as contentful from 'contentful-management';
import { queryGraphQLContent } from './gqlClient';
// import * as fs from 'fs';

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
  NavMenuDataQuery,
  RecipeSlugsQuery,
  TagSlugsQuery,
  RecipeListQuery,
  LinkedEntriesQuery,
  LinkedEntriesDocument
} from '../types/queries';

import { hasValue } from './utils';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN ?? '';
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '';
// const API_ENDPOINT = process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_API;

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
  space: SPACE_ID
});

// used to query content for nav menu taxonomy on client layout
export const getNavTaxonomy = async () => {
  const { queryGraphQLContent } = await import('lib/gqlClient');

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

// used to get linked entries for recipe edit

export const getLinkedEntries = async () => {
  const { queryGraphQLContent } = await import('lib/gqlClient');

  const results: LinkedEntriesQuery = await queryGraphQLContent(
    LinkedEntriesDocument
  );

  const { images, tags } = results;

  return {
    ...(images && {
      images: images.items
    }),
    ...(tags && {
      tags: tags.items
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

  return tags ? filterSlugs(tags) : [];
};

// used to query content for home index page
export const getRecipeIndex = async (variables?: RecipeIndexQueryVariables) => {
  const { recipeCollection } = await queryGraphQLContent(
    RecipeIndexDocument,
    variables
  );

  return recipeCollection ? recipeCollection.items.filter(hasValue) : [];
};

// used to query content for tag & category page
export const getRecipeList = async (variables?: RecipeListQueryVariables) => {
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

// upload media asset to Contentful

// MOVE TO AWS API
// UPLOAD IMAGE TO S3 USING SECURE URL
// SEND SECURE DOWNLOAD URL TO CONTENTFUL WITH CREATE ASSET REQUEST

const bufferToText = (buffer: ArrayBufferLike) => {
  const bufferByteLength = buffer.byteLength;
  const bufferUint8Array = new Uint8Array(buffer, 0, bufferByteLength);

  return new TextDecoder().decode(bufferUint8Array);
};

export const uploadImage = async (file: File) => {
  try {
    console.log({ file });

    const { name, type } = file;
    const buffer = await file.arrayBuffer();

    console.log('.buffer()', bufferToText(buffer));

    const upload =
      buffer &&
      (await client
        .getSpace(SPACE_ID)
        .then((space) => space.getEnvironment('master'))
        .then((environment) =>
          environment.createAssetFromFiles({
            fields: {
              title: {
                'en-US': name
              },
              description: {
                'en-US': 'Asset description'
              },
              file: {
                'en-US': {
                  contentType: type,
                  fileName: name,
                  file: buffer
                }
              }
            }
          })
        )
        .then((asset) => {
          console.log('processing upload');
          return asset.processForAllLocales({ processingCheckWait: 2000 });
        })
        .then((asset) => {
          console.log('publishing upload');
          return asset.publish();
        })
        .then((asset) => {
          console.log({ asset });
          return asset;
        }));

    console.log('Upload ', upload);
  } catch (e) {
    console.error(e);
  }
};
