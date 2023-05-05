import { APIGatewayEvent } from 'aws-lambda';

import contentful from 'contentful-management';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const CONTENTFUL_MANAGEMENT_API = process.env.CONTENTFUL_MANAGEMENT_API!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

const client = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

const getEntry = async ({ id }: { id: string }) => {
  const url = `${restApi}/entries/${id}`;

  try {
    const entry = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
      }
    });

    return entry.json();
  } catch (e) {
    console.error('GET ERROR:', e);
    throw e;
  }
};

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });
  console.log({ client });

  const { body, pathParameters, requestContext } = event;
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
    try {
      const entry = await getEntry({ id });

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
//   path: '/recipes/recipe_id',
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
//   pathParameters: { id: 'recipe_id' },
//   requestContext: {
//     resourcePath: '/recipes/{id}',
//     httpMethod: 'PUT',
//     path: '/test/recipes/recipe_id',
//     accountId: 'ACCOUNT_ID',
//     protocol: 'HTTP/1.1',
//     stage: 'test'
//   },
//   body: '{"name":"value"}'
// };
