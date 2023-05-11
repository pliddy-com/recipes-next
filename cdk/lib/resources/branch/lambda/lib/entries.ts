import fetch from 'node-fetch';
import dotenv from 'dotenv';

import client from './contentful';

import { IRecipeChangeSet } from './types';

dotenv.config();

/**
 *  Environment variables
 */

const BUILD_BRANCH = process.env.BUILD_BRANCH!;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;

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
 *  POST to GitHub Actions build webhook
 */

export const callBuildWebhook = async () => {
  try {
    const GH_WEBHOOK_TOKEN = process.env.GH_WEBHOOK_TOKEN!;
    const GH_WEBHOOK_URL = process.env.GH_WEBHOOK_URL!;

    if (!GH_WEBHOOK_URL) throw new Error('Webhook URL not available.');

    const build = await fetch(GH_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${GH_WEBHOOK_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'publish-event',
        client_payload: {
          build_branch: BUILD_BRANCH
        }
      })
    });

    return true;
  } catch (error) {
    console.error('Build Webhook error:', error);
    throw error;
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
  } catch (error) {
    console.error('GET ERROR:', error);
    throw error;
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
  try {
    if (!id) throw Error('No ID provided.');

    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    console.log('update entry:', entry);

    // map recipe values to entry fields

    for (const [key, value] of Object.entries(recipe)) {
      if (key !== 'id') entry.fields[key]['en-US'] = value;
    }

    const updated = await entry.update();

    // return updated values in IRecipeChangeSet object

    for (const [key, value] of Object.entries(recipe) as RecipeObjEntries) {
      if (key !== 'id') recipe[key] = updated.fields[key]['en-US'];
    }

    console.log('updated recipe:', recipe);
    console.log('updated entry:', updated);

    const published = await updated.publish();

    console.log('published entry:', published);

    // trigger build with call to GitHub Actions webhook

    const build = await callBuildWebhook();

    console.log('update build:', build);

    return recipe;
  } catch (e) {
    console.error('UPDATE ERROR:', e);
    throw e;
  }
};
