/* istanbul ignore file */

import { APIGatewayEvent } from 'aws-lambda';

import { getResponse } from '../lib/entries';

export const handler = async (event: APIGatewayEvent) => {
  console.log({ event });

  const body = event.body!;

  if (event.httpMethod !== 'POST') {
    return getResponse({
      statusCode: 405,
      body: JSON.stringify({ message: `${event.httpMethod} is not allowed.` })
    });
  }

  if (body) {
    const asset = JSON.parse(body);

    console.log('asset:', asset);

    const result = 'SUCCESS';

    try {
      // const entry = await updateEntry({ id, recipe });

      const response = getResponse({
        statusCode: 200,
        body: JSON.stringify(result)
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
    body: JSON.stringify({ message: `Asset resource is not available.` })
  });

  console.log({ response });

  return response;
};
