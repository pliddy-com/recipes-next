'use strict';

import type {
  CloudFrontRequestEvent,
  CloudFrontResponseResult,
  CloudFrontRequestResult,
} from 'aws-lambda';

export const handler = async (
  event: CloudFrontRequestEvent
): Promise<CloudFrontResponseResult | CloudFrontRequestResult> => {
  const [eventRecord] = event.Records;
  const {
    cf: { request },
  } = eventRecord;

  console.log('ORIGINAL REQUEST URI:', request.uri);

  if (request.uri.includes('.')) {
    console.log('FILE URI INCLUDES ".":', request.uri);

    return request;
  }

  if (request.uri === '/') {
    console.log('ROOT URI:', request.uri);
    return request;
  }

  if (
    request.uri !== '/' &&
    request.uri.startsWith('/') &&
    !request.uri.endsWith('/')
  ) {
    request.uri = request.uri + '.html';
    console.log('[slug] PATH URI:', request.uri);

    return request;
  }

  console.log('REQUEST URI:', request.uri);

  if (request.uri !== '/' && request.uri.endsWith('/')) {
    request.uri = request.uri.substring(0, request.uri.length - 1);
    console.log('REQUEST ENDS WITH A SLASH:', request.uri);
  }

  request.uri += '.html';

  console.log('RETURN:', request.uri);

  return request;
};
