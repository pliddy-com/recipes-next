import { APIGatewayEvent } from 'aws-lambda';

import { getResponse, updateEntry } from '../lib/entries';

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });

  const body = event.body!;
  const pathParameters = event.pathParameters;

  const id = pathParameters?.id!;

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

  if (event.httpMethod === 'PUT' && id) {
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

// {
//   "resource": "/recipes/{id}",
//   "path": "/recipes/UPi7NotPy5eJLOltfyocJ",
//   "httpMethod": "PUT",
//   "headers": {
//     "accept": "*/*",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9,la;q=0.8,sk;q=0.7",
//     "Authorization": "TOKEN",
//     "content-type": "text/plain;charset=UTF-8",
//     "origin": "https://152-finish-update.recipes.pliddy.com/",
//     "referer": "https://152-finish-update.recipes.pliddy.com//"
//   },
//   "pathParameters": {
//     "id": "UPi7NotPy5eJLOltfyocJ"
//   },
//   "requestContext": {
//     "resourcePath": "/recipes/{id}",
//     "httpMethod": "PUT",
//     "path": "/prod/recipes/UPi7NotPy5eJLOltfyocJ",
//     "accountId": "ACCOUNT_ID",
//     "protocol": "HTTP/1.1",
//     "stage": "test"
//   },
//   "body": "{ \"recipe\": { \"abstract\": \"A simple, smooth, and elegant soup made from pureed carrots and cream with the addition of a Sauce Velouté for extra silkiness.\", \"id\": \"UPi7NotPy5eJLOltfyocJ\", \"cookTime\": \"30\", \"prepTime\": \"10\", \"recipeYield\": \"2\", \"slug\": \"carrot-soup\", \"title\": \"Test Recipe\" } }"
// }
