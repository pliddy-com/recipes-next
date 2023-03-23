#!/usr/bin/env node

import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import contentful from 'contentful';
const { createClient } = contentful;

import richTextPlainTextRenderer from '@contentful/rich-text-plain-text-renderer';

// initialize environment variables
dotenv.config();

const algoliaAppId = core.getInput('algoliaAppId-to-greet');
const algoliaSearchAdminKey = core.getInput('algoliaSearchAdminKey');
const contentfulAccessToken = core.getInput('contentfulAccessToken');
const contentfulSpaceId = core.getInput('contentfulSpaceId');

const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchAdminKey);
const algoliaIndex = algoliaClient.initIndex('recipes_index');

const client = createClient({
  space: contentfulSpaceId,
  accessToken: contentfulAccessToken
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
    keywords: recipe.fields.keywords,
    objectID: recipe.sys.id,
    slug: recipe.fields.slug,
    tags: recipe.fields.tags.map((tag) => tag.fields.title),
    title: recipe.fields.title,
    url: `/recipe/${recipe.fields.slug}/`
  }));

  const indexedContent = await algoliaIndex.saveObjects(recipes);

  console.log(
    'Indexed Content:',
    indexedContent,
    `${indexedContent.objectIDs.length} objects indexed`
  );
} catch (err) {
  console.error(err);
}
