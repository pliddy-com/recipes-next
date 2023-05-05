import {
  APIGatewayEvent
  // Context
} from 'aws-lambda';

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

import contentful from 'contentful-management';

// const CONTENTFUL_ACCESS_TOKEN =
//   process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

const CONTENTFUL_MANAGEMENT_API = process.env.CONTENTFUL_MANAGEMENT_API!;
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

const restApi = `${CONTENTFUL_MANAGEMENT_API}/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

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
    console.log('GET ERROR:', e);
    throw e;
  }
};

exports.handler = async (
  event: APIGatewayEvent
  // context: Context
) => {
  console.log({ event });

  const { body, pathParameters, requestContext } = event;
  const id = pathParameters && pathParameters.id!;

  // if (event.httpMethod === 'PUT') {
  console.log({ body });
  // console.log({ requestContext });
  console.log({ pathParameters });

  if (id) {
    try {
      const entry = getEntry({ id });

      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(entry)
      };

      return response;
    } catch (error) {
      const response = {
        statusCode: 400,
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
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(`Recipe ${id} is not available.`)
  };

  return response;

  // console.log({ contentful });

  // const client = contentful.createClient({
  //   accessToken: `${CONTENTFUL_ACCESS_TOKEN}`
  // });

  // console.log({ client });

  // if (id && client) {
  //   // This API call will request a space with the specified ID
  //   const entry = client.getSpace('spaceId').then((space) => {
  //     // This API call will request an environment with the specified ID
  //     space.getEnvironment('master').then((environment) => {
  //       // Now that we have an environment, we can get entries from that space
  //       environment.getEntry(id).then((entry) => {
  //         console.log({ entry });
  //       });
  //     });
  //   });

  //   const response = {
  //     statusCode: 200,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': true
  //     },
  //     body: JSON.stringify(entry)
  //   };

  //   return response;
  // }

  // Example updating an entry
  // entry.fields.name['en-US'] = 'Blog Post';
  // entry.update().then((entry) => console.log(entry.fields.name['en-US']));
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
