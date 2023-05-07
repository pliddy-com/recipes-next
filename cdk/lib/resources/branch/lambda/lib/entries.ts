import { IRecipeChangeSet } from './types';
import contentful from 'contentful-management';

/**
 *  Environment variables
 */

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

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

export const updateEntry = async ({ recipe }: { recipe: IRecipeChangeSet }) => {
  console.log('update:', recipe);

  const id = JSON.parse(JSON.stringify(recipe)).id;

  console.log('update:', id);

  try {
    if (!id) throw Error('No ID provided');

    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    console.log('update:', entry);

    // map recipe values to entry fields

    for (const [key, value] of Object.entries(recipe)) {
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
    // with payload:
    //
    // {
    //   "event_type": "publish-event",
    //   "client_payload": {
    //     "build_branch": "main" || "branch_id"
    // }
    //
    // TODO: pass branch ID into Lambda build

    return entry;
  } catch (e) {
    console.error('UPDATE ERROR:', e);
    throw e;
  }
};
