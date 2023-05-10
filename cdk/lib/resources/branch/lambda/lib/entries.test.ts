import 'node-fetch';

import { getResponse } from './entries';

jest.mock('node-fetch', () => jest.fn());
jest.mock('./contentful');

describe('in entries.ts', () => {
  describe('when getResponse() is called', () => {
    it('it returns properly formatted response', () => {
      const statusCode = 200;
      const body = JSON.stringify({ name: 'value' });

      const expected = {
        statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body
      };

      const res = getResponse({ statusCode, body });

      expect(res).toEqual(expected);
    });
  });
});
