import {
  APIGatewayProxyEvent
  // APIGatewayProxyResult
  // Context
} from 'aws-lambda';

export const handler = async (
  event: {
    resource?: string;
    path?: string;
    httpMethod?: string;
    headers?: {
      accept: string;
      'accept-encoding': string; // if (event.httpMethod === 'PUT') {
      // if (event.httpMethod === 'PUT') {
      'accept-language': string;
      Authorization: string;
      'content-type': string;
      Host: string;
      origin: string;
      referer: string;
      'sec-ch-ua': string;
      'sec-ch-ua-mobile': string;
      'sec-ch-ua-platform': string;
      'sec-fetch-dest': string;
      'sec-fetch-mode': string;
      'sec-fetch-site': string;
      'User-Agent': string;
      'X-Amzn-Trace-Id': string;
      'X-Forwarded-For': string;
      'X-Forwarded-Port': string;
      'X-Forwarded-Proto': string;
    };
    multiValueHeaders?: {
      accept: ArrayConstructor[];
      'accept-encoding': ArrayConstructor[];
      'accept-language': ArrayConstructor[];
      Authorization: ArrayConstructor[]; //   body: 'Method not supported'
      // };
      'content-type': ArrayConstructor[]; // };
      Host: ArrayConstructor[];
      origin: ArrayConstructor[];
      referer: ArrayConstructor[];
      'sec-ch-ua': ArrayConstructor[];
      'sec-ch-ua-mobile': ArrayConstructor[];
      'sec-ch-ua-platform': ArrayConstructor[];
      'sec-fetch-dest': ArrayConstructor[];
      'sec-fetch-mode': ArrayConstructor[];
      'sec-fetch-site': ArrayConstructor[];
      'User-Agent': ArrayConstructor[];
      'X-Amzn-Trace-Id': ArrayConstructor[];
      'X-Forwarded-For': ArrayConstructor[];
      'X-Forwarded-Port': ArrayConstructor[];
      'X-Forwarded-Proto': ArrayConstructor[];
    };
    queryStringParameters?: null;
    multiValueQueryStringParameters?: null;
    pathParameters: any;
    stageVariables?: null;
    requestContext: any;
    body: any;
    isBase64Encoded?: boolean;
  }
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
  // }

  // return {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true
  //   },
  //   body: 'Method not supported'
  // };
};
