import { APIGatewayEvent } from 'aws-lambda';
import { handler } from '../lib/resources/branch/lambda/updateRecipe';

import * as contentful from 'contentful-management';

jest.mock('contentful-management');

// const mockedContentful = <jest.Mock<typeof contentful>>(<unknown>contentful);

// mockedContentful.client = {
//   createClient: jest.fn().mockImplementation(() => ({
//     getEnvironment: jest.fn().mockImplementation(() => ({
//       getSpace: jest.fn().mockImplementation(() => ({
//         getEntry: jest.fn().mockImplementation(() => ({
//           name: 'value'
//         }))
//       }))
//     }))
//   }))
// };

const event = {
  resource: '/recipes/{id}',
  path: '/recipes/recipe_id',
  httpMethod: 'PUT',
  headers: {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,la;q=0.8,sk;q=0.7',
    Authorization: 'TOKEN',
    'content-type': 'text/plain;charset=UTF-8',
    origin: 'https://test.recipes.pliddy.com',
    referer: 'https://test.recipes.pliddy.com/'
  },
  pathParameters: { id: 'recipe_id' },
  requestContext: {
    resourcePath: '/recipes/{id}',
    httpMethod: 'PUT',
    path: '/test/recipes/recipe_id',
    accountId: 'ACCOUNT_ID',
    protocol: 'HTTP/1.1',
    stage: 'test'
  },
  body: '{"name":"value"}'
};

describe('UpdateRecipe', () => {
  it('handles the PUT request', async () => {
    // console.log('PENDING TEST');
    // const contentfulSpy = jest
    //   .spyOn(contentful, 'createClient')
    //   .mockImplementation(() => {
    //     createClient: jest.fn().mockReturnValue(() => ({
    //       getEnvironment: jest.fn().mockReturnValue(() => ({
    //         getSpace: jest.fn().mockReturnValue(() => ({
    //           getEntry: jest.fn().mockReturnValue(() => ({
    //             name: 'value'
    //           }))
    //         }))
    //       }))
    //     }));
    //   });

    const result = await handler(event as unknown as APIGatewayEvent);
    expect(JSON.parse(result.body)).toBe(event.body);
  });
});
