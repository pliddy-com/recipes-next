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

const updateEntry = async ({ recipe }: { recipe: IFormState }) => {
  console.log('updateEntry recipe:', recipe);

  const { id } = recipe;

  console.log('updateEntry id:', id);

  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');
    const entry = await env.getEntry(id);

    for (const [key, value] of Object.entries(recipe)) {
      console.log(`${key}: ${value}`);
      entry.fields[key]['en-US'] = value;
    }

    await entry.update();

    for (const [key, value] of Object.entries(recipe) as RecipeObjEntries) {
      console.log(`${key}: ${value}`);
      recipe[key] = entry.fields[key]['en-US'];
    }

    return recipe;
  } catch (e) {
    console.error('GET ERROR:', e);
    throw e;
  }
};

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });
  console.log({ client });

  const { body, pathParameters } = event;
  const id = pathParameters && pathParameters.id!;

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: `${event.httpMethod} is not allowed.`
      })
    };
  }

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: `No recipe specified.`
      })
    };
  }

  if (!client) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: `Client unavailable.`
      })
    };
  }

  if (event.httpMethod === 'PUT' && id && client) {
    const recipe = body && JSON.parse(body);

    console.log({ recipe });

    if (recipe) {
      try {
        const entry = await updateEntry({ recipe });

        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(entry)
        };

        console.log({ response });

        return response;
      } catch (error) {
        const response = {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(error)
        };

        console.error(error);

        return response;
      }
    }
  }

  const response = {
    statusCode: 401,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ message: `Recipe ${id} is not available.` })
  };

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
//     origin: 'https://test.recipes.pliddy.com',
//     referer: 'https://test.recipes.pliddy.com/'
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
