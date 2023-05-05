import { APIGatewayEvent } from 'aws-lambda';

import fetch from 'node-fetch';
import dotenv from 'dotenv';
// import contentful from 'contentful-management';

dotenv.config();

const CONTENTFUL_MANAGEMENT_API = process.env.CONTENTFUL_MANAGEMENT_API!;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

const getEntry = async ({ id }: { id: string }) => {
  const url = `${restApi}/entries/${id}`;

  console.log({ url });

  try {
    const entry = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
      }
    });

    console.log('getEntry:', entry.json());
    return entry.json();
  } catch (e) {
    console.log('GET ERROR:', e);
    throw e;
  }
};

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });

  const { body, pathParameters, requestContext } = event;
  const id = pathParameters && pathParameters.id!;

  console.log({ body });
  console.log({ pathParameters });

  // congole.log({ client });

  if (event.httpMethod === 'PUT' && id) {
    try {
      const entry = await getEntry({ id });

      console.log({ entry });

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
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(error)
      };

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
