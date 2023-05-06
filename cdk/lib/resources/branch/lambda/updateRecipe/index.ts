import { APIGatewayEvent } from 'aws-lambda';
import contentful from 'contentful-management';

const CONTENTFUL_MANAGEMENT_API = process.env.CONTENTFUL_MANAGEMENT_API!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

const client = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

// const getEntry = async ({ id }: { id: string }) => {
//   try {
//     const space = await client.getSpace(CONTENTFUL_SPACE_ID);
//     const env = await space.getEnvironment('master');
//     const entry = await env.getEntry(id);

//     return entry;
//   } catch (e) {
//     console.error('GET ERROR:', e);
//     throw e;
//   }
// };

// TODO: share this defintion with client without crossing workspaces (shared space?)

const getResponse = ({
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

export interface IFormState {
  abstract: string;
  cookTime: string | number;
  id: string;
  prepTime: string | number;
  recipeYield: string | number;
  slug: string;
  title: string;
}

type ObjEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type RecipeObjEntries = ObjEntries<IFormState>;

const updateEntry = async ({
  id,
  recipe
}: {
  id: string;
  recipe: IFormState;
}) => {
  console.log('updateEntry id:', id);

  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    console.log('updateEntry entry:', entry);
    console.log('updateEntry recipe:', recipe);

    for (const [key, value] of Object.entries(recipe)) {
      console.log(`${key}: ${value}`);
      if (key !== 'id') entry.fields[key]['en-US'] = value;
    }

    const updateRes = await entry.update();

    console.log('entry update:', updateRes);

    for (const [key, value] of Object.entries(recipe) as RecipeObjEntries) {
      console.log(`${key}: ${value}`);
      if (key !== 'id') recipe[key] = entry.fields[key]['en-US'];
    }

    console.log('updated recipe:', recipe);
    console.log('updated entry:', entry);

    const publishRes = await entry.publish();

    console.log('entry publish:', publishRes);

    return entry;
  } catch (e) {
    console.error('GET ERROR:', e);
    throw e;
  }
};

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });
  console.log({ client });

  const body = event.body!;
  const pathParameters = event.pathParameters;

  const id = pathParameters?.id!;

  // TODO: make response creation a shared function with status code && body
  if (event.httpMethod !== 'PUT') {
    return getResponse({
      statusCode: 405,
      body: JSON.stringify({ message: `${event.httpMethod} is not allowed.` })
    });
  }

  if (!id) {
    return getResponse({
      statusCode: 400,
      body: JSON.stringify({ message: 'No recipe specified.' })
    });
  }

  if (!client) {
    return getResponse({
      statusCode: 500,
      body: JSON.stringify({ message: 'Client unavailable.' })
    });
  }

  if (event.httpMethod === 'PUT' && id && client) {
    const recipe = JSON.parse(body);

    console.log('recipe:', recipe);

    if (recipe) {
      try {
        const entry = await updateEntry({ id, recipe });

        const response = getResponse({
          statusCode: 200,
          body: JSON.stringify(entry)
        });

        console.log({ response });

        return response;
      } catch (error) {
        const response = getResponse({
          statusCode: 500,
          body: JSON.stringify(error)
        });

        console.error(error);

        return response;
      }
    }
  }

  const response = getResponse({
    statusCode: 401,
    body: JSON.stringify({ message: `Recipe ${id} is not available.` })
  });

  console.log({ response });
  return response;
};

// event = {
//   resource: '/recipes/{id}',
//   path: '/recipes/3aPUmkVvKhlHUopdslrze8',
//   httpMethod: 'PUT',
//   headers: {
//     accept: '*/*',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'en-US,en;q=0.9,la;q=0.8,sk;q=0.7',
//     Authorization: 'TOKEN',
//     'content-type': 'text/plain;charset=UTF-8',
//     origin: 'https://151-update.recipes.recipes.pliddy.com',
//     referer: 'https://151-update.recipes.recipes.pliddy.com/'
//   },
//   pathParameters: { id: '3aPUmkVvKhlHUopdslrze8' },
//   requestContext: {
//     resourcePath: '/recipes/{id}',
//     httpMethod: 'PUT',
//     path: '/test/recipes/3aPUmkVvKhlHUopdslrze8',
//     accountId: 'ACCOUNT_ID',
//     protocol: 'HTTP/1.1',
//     stage: 'test'
//   },
//   body: '{"name":"value"}'
// };

// {
//   "resource": "/recipes/{id}",
//   "path": "/recipes/3aPUmkVvKhlHUopdslrze8",
//   "httpMethod": "PUT",
//   "headers": {
//     "accept": "*/*",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9,la;q=0.8,sk;q=0.7",
//     "Authorization": "TOKEN",
//     "content-type": "text/plain;charset=UTF-8",
//     "origin": "https://test.recipes.pliddy.com",
//     "referer": "https://test.recipes.pliddy.com/"
//   },
//   "pathParameters": {
//     "id": "3aPUmkVvKhlHUopdslrze8"
//   },
//   "requestContext": {
//     "resourcePath": "/recipes/{id}",
//     "httpMethod": "PUT",
//     "path": "/test/recipes/3aPUmkVvKhlHUopdslrze8",
//     "accountId": "ACCOUNT_ID",
//     "protocol": "HTTP/1.1",
//     "stage": "test"
//   },
//   "body": "{\"name\":\"value\"}"
// }
