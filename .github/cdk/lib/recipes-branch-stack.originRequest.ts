import { Handler } from 'aws-cdk-lib/aws-lambda';

exports.handler = async (event: { Records: any[] }): Promise<Handler> => {
  const eventRecord = event.Records[0];
  const request = eventRecord.cf.request;
  const requestUri = request.uri;

  console.log('request.uri', request.uri);

  // if URI includes ".", indicates file extension, return early and don't modify URI
  if (requestUri.includes('.')) {
    console.log("request includes '.':", JSON.stringify(event, undefined, 2));
    return request;
  }

  // handle /[slug] dynamic route
  if (requestUri !== '/' && requestUri.startsWith('/')) {
    request.uri = requestUri + '.html';
    console.log(
      'request is a [slug] path, add.html - request.uri:',
      request.uri
    );
    return request;
  }

  console.log('request.uri:', request.uri);

  // if URI ends with "/" slash, then remove it before appending .html
  if (requestUri.endsWith('/')) {
    request.uri = requestUri.substring(0, requestUri.length - 1);
    console.log(
      'request ends with a slash, add.html - request.uri:',
      request.uri
    );
  }

  request.uri += '.html';

  console.log('request.url returned:', request.uri);

  return request;
};
