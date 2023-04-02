import { handler } from '../lib/recipes-branch-stack.originRequest';

import type { CloudFrontRequestEvent } from 'aws-lambda';

const getEvent = ({ originalUri }: { originalUri: string }) => {
  const event: CloudFrontRequestEvent = {
    Records: [
      {
        cf: {
          config: {
            distributionDomainName: 'distributionDomainName',
            distributionId: 'distributionId',
            eventType: 'origin-request',
            requestId: 'requestId'
          },
          request: {
            clientIp: `0.0.0.0`,
            method: 'GET',
            querystring: '',
            headers: {},
            uri: originalUri
          }
        }
      }
    ]
  };

  return event;
};

const getExpected = ({ expectedUri }: { expectedUri: string }) => {
  const expected = {
    clientIp: '0.0.0.0',
    headers: {},
    method: 'GET',
    querystring: '',
    uri: expectedUri
  };

  return expected;
};

describe('OriginRequest', () => {
  it('strips the trailing slash adds .html to default requests', async () => {
    const originalUri = '/tags/';
    const expectedUri = '/tags.html';
    const event = getEvent({ originalUri });
    const expected = getExpected({ expectedUri });

    const result = await handler(event);

    expect(result).toEqual(expected);
  });

  it('returns the original uri for files (with ".")', async () => {
    const originalUri = '/test.js';
    const expectedUri = originalUri;
    const event = getEvent({ originalUri });
    const expected = getExpected({ expectedUri });

    const result = await handler(event);

    expect(result).toEqual(expected);
  });

  it('returns the original uri for the root path ("/")', async () => {
    const originalUri = '/';
    const expectedUri = originalUri;
    const event = getEvent({ originalUri });
    const expected = getExpected({ expectedUri });

    const result = await handler(event);

    expect(result).toEqual(expected);
  });

  it('adds .html to default requests without a trailing slash', async () => {
    const originalUri = '/tags';
    const expectedUri = `${originalUri}.html`;
    const event = getEvent({ originalUri });
    const expected = getExpected({ expectedUri });

    const result = await handler(event);

    expect(result).toEqual(expected);
  });
});
