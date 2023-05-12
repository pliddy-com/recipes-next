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

  if (body) {
    const recipe = JSON.parse(body);

    console.log('recipe:', recipe);

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

  const response = getResponse({
    statusCode: 401,
    body: JSON.stringify({ message: `Recipe ${id} is not available.` })
  });

  console.log({ response });

  return response;
};
