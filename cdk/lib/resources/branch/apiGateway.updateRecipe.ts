import {
  APIGatewayEvent
  // Context
} from 'aws-lambda';

import contentful from 'contentful-management';

const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// TODO: use contentful management package
//       add environment variables to AWS deployment

exports.handler = async (
  event: APIGatewayEvent
  // context: Context
) => {
  console.log({ event });

  const { body, pathParameters, requestContext } = event;
  const id = pathParameters && pathParameters['id'];

  // if (event.httpMethod === 'PUT') {
  console.log({ body });
  // console.log({ requestContext });
  console.log({ pathParameters });

  const client = contentful.createClient({
    accessToken: `${CONTENTFUL_ACCESS_TOKEN}`
  });

  if (id && client) {
    // This API call will request a space with the specified ID
    const entry = client.getSpace('spaceId').then((space) => {
      // This API call will request an environment with the specified ID
      space.getEnvironment('master').then((environment) => {
        // Now that we have an environment, we can get entries from that space
        environment.getEntry(id).then((entry) => {
          console.log({ entry });
        });
      });
    });

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(entry)
    };

    return response;
  }

  const response = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify('Can not retrieve the recipe.')
  };

  return response;

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
