import fetch from 'node-fetch';

import { IRecipeChangeSet } from './types';
import contentful from 'contentful-management';

/**
 *  Environment variables
 */

const BUILD_BRANCH = process.env.BUILD_BRANCH;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const GH_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN;
const GH_WEBHOOK_URL = process.env.GH_WEBHOOK_URL;

/**
 *  Contentful client
 */

const client = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

/**
 *  Standardized response with required CORS headers
 */

export const getResponse = ({
  statusCode,
  body
}: {
  statusCode: number;
  body: string;
}) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body
  };
};

/**
 *  POST to GitHub Actions webhook
 */

// TODO: move webhook URL & GHA auth token
// TODO: pass branch ID into Lambda build (better than using URL)

export const callBuildWebhook = async () => {
  // DON'T COMMIT THIS URL
  const webhookUrl = GH_WEBHOOK_URL;

  try {
    if (!webhookUrl) throw new Error('Webhook URL not available.');

    const response = fetch(webhookUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GH_WEBHOOK_TOKEN}`
      },
      body: JSON.stringify({
        event_type: 'publish-event',
        client_payload: {
          // DON'T COMMIT THIS BRANCH ID
          build_branch: BUILD_BRANCH
        }
      })
    });

    const res = (await response).json();

    return res;
  } catch (e) {
    throw e;
  }
};

/**
 *  Retrieves an entry from the contentful space
 */

export const getEntry = async ({ id }: { id: string }) => {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    return entry;
  } catch (e) {
    console.error('GET ERROR:', e);
    throw e;
  }
};

/**
 *  Updates an entry from the contentful space
 */

type ObjEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type RecipeObjEntries = ObjEntries<IRecipeChangeSet>;

export const updateEntry = async ({
  id,
  recipe
}: {
  id: string;
  recipe: IRecipeChangeSet;
}) => {
  console.log('update:', recipe);

  console.log('update:', id);

  try {
    if (!id) throw Error('No ID provided');

    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    console.log('update:', entry);

    // map recipe values to entry fields

    for (const [key, value] of Object.entries(recipe)) {
      console.log({ key, value });
      if (key !== 'id') entry.fields[key]['en-US'] = value;
    }

    const updated = await entry.update();

    // return updated values in IRecipeChangeSet object

    for (const [key, value] of Object.entries(recipe) as RecipeObjEntries) {
      if (key !== 'id') recipe[key] = updated.fields[key]['en-US'];
    }

    console.log('updated:', recipe);
    console.log('updated:', updated);

    const published = await updated.publish();

    console.log('published:', published);

    // trigger build with call to GitHub Actions webhook

    const build = await callBuildWebhook();

    console.log('build:', build);

    return recipe;
  } catch (e) {
    console.error('UPDATE ERROR:', e);
    throw e;
  }
};
