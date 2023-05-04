import {
  APIGatewayEvent,
  APIGatewayProxyEvent
  // Context
} from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent
  // context: Context
) => {
  console.log({ event });

  const { body, pathParameters, requestContext } = event;

  // if (event.httpMethod === 'PUT') {
  console.log({ body });
  console.log({ requestContext });
  console.log({ pathParameters });

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };

  return response;
};
