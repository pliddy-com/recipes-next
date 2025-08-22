import core from '@actions/core';
import { algoliasearch } from 'algoliasearch';
import { createClient } from 'contentful';
import richTextPlainTextRenderer from '@contentful/rich-text-plain-text-renderer';

const algoliaAppId = core.getInput('algoliaAppId');
const algoliaSearchAdminKey = core.getInput('algoliaSearchAdminKey');
const contentfulAccessToken = core.getInput('contentfulAccessToken');
const contentfulSpaceId = core.getInput('contentfulSpaceId');

const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchAdminKey);
const defaultAspectRatio = 3 / 2;

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
    image: {
      sys: {
        id: recipe.fields.image.sys.id
      },
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

  const indexedContent = await algoliaClient.saveObjects({
    indexName: 'recipes_index',
    objects: recipes
  });

  console.log('response from algoliaClient.saveObjects');
  console.log(indexedContent);

  // console.log(`${indexedContent.objectIDs.length} recipes indexed`);
} catch (err) {
  console.error(err);
}
