import { handler } from '../lib/resources/branch/updateRecipe';

const event = {
  resource: '/recipes/{id}',
  path: '/recipes/6u34oR4Vg28sQW269VW5np',
  httpMethod: 'PUT',
  headers: {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,la;q=0.8,sk;q=0.7',
    Authorization:
      'eyJraWQiOiJFN3RpVWkzNDRiRnE5Q2d6XC9EXC9OU3BlVktvYVFlaTEyRU80QUtnSWVkTVk9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiNWIxNmVmMS1mZGExLTRkNzAtYjU1Mi03NThiOTI0MjE1ZjQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbENKWGR2RzF3IiwiY29nbml0bzp1c2VybmFtZSI6ImI1YjE2ZWYxLWZkYTEtNGQ3MC1iNTUyLTc1OGI5MjQyMTVmNCIsIm9yaWdpbl9qdGkiOiIxMzNmMDQ3My1iOTNkLTQxNTMtODU5OS05Njg1YTY5NTZmNTAiLCJhdWQiOiIxMjY4YWZ2bGg4bWtxOGRqbjlnc2hzbGEzYiIsImV2ZW50X2lkIjoiNjkyMzRhYWItM2YwNS00OGY2LWE0MjYtZjQzZWM5MThiMDdjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2ODMxNTAzMTAsImV4cCI6MTY4MzE2MTM1NSwiaWF0IjoxNjgzMTU3NzU1LCJqdGkiOiIxNWQ5YzZjOC03NDQ1LTRiZDAtODA4Mi1mZjk0NDVlYTc3ZjEiLCJlbWFpbCI6InBqbGlkZHlAZ21haWwuY29tIn0.HLqx_UVYTFJAmkEFzkxjd6fqYeUdX0TAid0CiRxEDqIsagYy7-iNyOxCexEOZLNHn91vNloI32eTXt8ZWDi2jjYJVwNIHHlEzqu6zl_tbAtVefxQy5ZEQX7LD9xwhzeSvy-leakI7jLGOfWZttDixYyr8tORXSUFRcn9Yc6fVORSFQ1O-RQvrhwDocm8VZEO_K6J9p0nHiUCJquXT-6kEk8xNxr2w6hljCNkTSoxTBFl52Xb8m693F9kKIZKG_z3HrORCMXpT0xRtiMKji8F2_Bc7EtYAU1ozpusrgGczCdUaeBUDUNns6eyMskdPqyT1Uf4i6p8Wcaz2OBfrisd3A',
    'content-type': 'text/plain;charset=UTF-8',
    Host: 'yac4ltvklg.execute-api.us-east-1.amazonaws.com',
    origin: 'http://localhost:3000',
    referer: 'http://localhost:3000/',
    'sec-ch-ua':
      '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'X-Amzn-Trace-Id': 'Root=1-6452f300-7cbf6f977fc4e4756bd74944',
    'X-Forwarded-For': '73.167.232.103',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders: {
    accept: [Array],
    'accept-encoding': [Array],
    'accept-language': [Array],
    Authorization: [Array],
    'content-type': [Array],
    Host: [Array],
    origin: [Array],
    referer: [Array],
    'sec-ch-ua': [Array],
    'sec-ch-ua-mobile': [Array],
    'sec-ch-ua-platform': [Array],
    'sec-fetch-dest': [Array],
    'sec-fetch-mode': [Array],
    'sec-fetch-site': [Array],
    'User-Agent': [Array],
    'X-Amzn-Trace-Id': [Array],
    'X-Forwarded-For': [Array],
    'X-Forwarded-Port': [Array],
    'X-Forwarded-Proto': [Array]
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: { id: '6u34oR4Vg28sQW269VW5np' },
  stageVariables: null,
  requestContext: {
    resourceId: '3vbu1a',
    authorizer: [Object],
    resourcePath: '/recipes/{id}',
    httpMethod: 'PUT',
    extendedRequestId: 'EXroGH6wIAMF_lg=',
    requestTime: '03/May/2023:23:49:20 +0000',
    path: '/test/recipes/6u34oR4Vg28sQW269VW5np',
    accountId: '775903224792',
    protocol: 'HTTP/1.1',
    stage: 'test',
    domainPrefix: 'yac4ltvklg',
    requestTimeEpoch: 1683157760346,
    requestId: 'e49b231c-05bf-4bdd-9083-be55420243e2',
    identity: [Object],
    domainName: 'yac4ltvklg.execute-api.us-east-1.amazonaws.com',
    apiId: 'yac4ltvklg'
  },
  body: '{"abstract":"Light and fluffy basmati rice using a traditional Indian technique in a covered skillet with the added kick from fresh lime.","id":"6u34oR4Vg28sQW269VW5np","cookTime":"20","prepTime":"25","recipeYield":"4","slug":"basmati-lime-rice","title":"Basmati Lime Rice"}',
  isBase64Encoded: false
};

describe('UpdateRecipe', () => {
  it('handles the PUT request', async () => {
    const result = await handler(event);
  });
});
