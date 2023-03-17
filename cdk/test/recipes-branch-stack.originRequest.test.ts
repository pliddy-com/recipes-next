import { handler } from '../lib/recipes-branch-stack.originRequest';

import type {
  CloudFrontRequestEvent,
  CloudFrontResponseResult,
  CloudFrontRequestResult
} from 'aws-lambda';

describe('OriginRequest', () => {
  it('strips the trailing slash adds .html to default requests', async () => {
    const originalUri = '/tag/';
    const expectedUri = `${originalUri}.html`;
    const event = {
      Records: [
        {
          cf: {
            request: {
              uri: originalUri
            }
          }
        }
      ]
    };

    const expected = { uri: '/tag.html' };

    const result = await handler(event as unknown as CloudFrontRequestEvent);

    expect(result).toEqual(expected);
  });

  it('returns the original uri for files (with ".")', async () => {
    const originalUri = '/test.js';

    const event = {
      Records: [
        {
          cf: {
            request: {
              uri: originalUri
            }
          }
        }
      ]
    };

    const expected = { uri: originalUri };

    const result = await handler(event as unknown as CloudFrontRequestEvent);

    expect(result).toEqual(expected);
  });

  it('returns the original uri for the root path ("/")', async () => {
    const originalUri = '/';

    const event = {
      Records: [
        {
          cf: {
            request: {
              uri: originalUri
            }
          }
        }
      ]
    };

    const expected = { uri: originalUri };

    const result = await handler(event as unknown as CloudFrontRequestEvent);

    expect(result).toEqual(expected);
  });

  it('adds .html to default requests without a trailing slash', async () => {
    const originalUri = '/tag';
    const expectedUri = `${originalUri}.html`;
    const event = {
      Records: [
        {
          cf: {
            request: {
              uri: originalUri
            }
          }
        }
      ]
    };

    const expected = { uri: '/tag.html' };

    const result = await handler(event as unknown as CloudFrontRequestEvent);

    expect(result).toEqual(expected);
  });
});
