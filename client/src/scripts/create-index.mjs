#!/usr/bin/env node

import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import contentful from 'contentful';
const { createClient } = contentful;

import richTextPlainTextRenderer from '@contentful/rich-text-plain-text-renderer';

const defaultAspectRatio = 3 / 2;

(async () => {
  // initialize environment variables
  dotenv.config({ quiet: true });

  const {
    ALGOLIA_SEARCH_ADMIN_KEY,
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  } = process.env;

  const algoliaClient = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_ADMIN_KEY
  );
  const algoliaIndex = algoliaClient.initIndex('recipes_index');

  const client = createClient({
    space: NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  });

  try {
    const { items } = await client.getEntries({
      content_type: 'recipe',
      limit: 1000
    });

    const recipes = items.map((recipe) => ({
      // remove markdown syntax for better search results
      content: richTextPlainTextRenderer.documentToPlainTextString(
        recipe.fields.description
      ),
      abstract: recipe.fields.abstract,
      image: {
        url: recipe.fields.image.fields.file.url,
        description: recipe.fields.image.fields.description,
        height:
          recipe.fields.image.fields.file.details.image.width /
          defaultAspectRatio,
        width: recipe.fields.image.fields.file.details.image.width
      },
      keywords: recipe.fields.keywords,
      objectID: recipe.sys.id,
      slug: recipe.fields.slug,
      sys: recipe.sys,
      tagsCollection: {
        items: recipe.fields.tags.map((tag) => ({
          slug: tag.fields.slug,
          title: tag.fields.title
        }))
      },
      tagContent: recipe.fields.tags.map((tag) => tag.fields.title),
      title: recipe.fields.title,
      __typename: recipe.__typename,
      url: `/recipe/${recipe.fields.slug}`
    }));

    const indexedContent = await algoliaIndex.saveObjects(recipes);

    console.log(
      'Indexed Content:',
      indexedContent,
      `${indexedContent.objectIDs.length} recipes indexed`
    );
  } catch (err) {
    console.error(err);
  }
})();
