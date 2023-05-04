"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateRecipe_1 = require("../lib/resources/branch/lambda/updateRecipe");
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
        const result = await (0, updateRecipe_1.handler)(event);
        expect(JSON.parse(result.body)).toBe(event.body);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlUmVjaXBlLk5PVHRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGRhdGVSZWNpcGUuTk9UdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhFQUFzRTtBQUl0RSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFbkMsZ0ZBQWdGO0FBRWhGLDhCQUE4QjtBQUM5Qix3REFBd0Q7QUFDeEQsNERBQTREO0FBQzVELHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFDMUQsMEJBQTBCO0FBQzFCLGNBQWM7QUFDZCxZQUFZO0FBQ1osVUFBVTtBQUNWLFFBQVE7QUFDUixLQUFLO0FBRUwsTUFBTSxLQUFLLEdBQUc7SUFDWixRQUFRLEVBQUUsZUFBZTtJQUN6QixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSxLQUFLO1FBQ2IsaUJBQWlCLEVBQUUsbUJBQW1CO1FBQ3RDLGlCQUFpQixFQUFFLGtDQUFrQztRQUNyRCxhQUFhLEVBQUUsT0FBTztRQUN0QixjQUFjLEVBQUUsMEJBQTBCO1FBQzFDLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLGtDQUFrQztLQUM1QztJQUNELGNBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUU7SUFDbkMsY0FBYyxFQUFFO1FBQ2QsWUFBWSxFQUFFLGVBQWU7UUFDN0IsVUFBVSxFQUFFLEtBQUs7UUFDakIsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixTQUFTLEVBQUUsWUFBWTtRQUN2QixRQUFRLEVBQUUsVUFBVTtRQUNwQixLQUFLLEVBQUUsTUFBTTtLQUNkO0lBQ0QsSUFBSSxFQUFFLGtCQUFrQjtDQUN6QixDQUFDO0FBRUYsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3ZDLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0IsdUNBQXVDO1FBQ3ZDLGdDQUFnQztRQUNoQyx1REFBdUQ7UUFDdkQsMkRBQTJEO1FBQzNELHVEQUF1RDtRQUN2RCx5REFBeUQ7UUFDekQsNEJBQTRCO1FBQzVCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsWUFBWTtRQUNaLFdBQVc7UUFDWCxRQUFRO1FBRVIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLHNCQUFPLEVBQUMsS0FBbUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgaGFuZGxlciB9IGZyb20gJy4uL2xpYi9yZXNvdXJjZXMvYnJhbmNoL2xhbWJkYS91cGRhdGVSZWNpcGUnO1xuXG5pbXBvcnQgKiBhcyBjb250ZW50ZnVsIGZyb20gJ2NvbnRlbnRmdWwtbWFuYWdlbWVudCc7XG5cbmplc3QubW9jaygnY29udGVudGZ1bC1tYW5hZ2VtZW50Jyk7XG5cbi8vIGNvbnN0IG1vY2tlZENvbnRlbnRmdWwgPSA8amVzdC5Nb2NrPHR5cGVvZiBjb250ZW50ZnVsPj4oPHVua25vd24+Y29udGVudGZ1bCk7XG5cbi8vIG1vY2tlZENvbnRlbnRmdWwuY2xpZW50ID0ge1xuLy8gICBjcmVhdGVDbGllbnQ6IGplc3QuZm4oKS5tb2NrSW1wbGVtZW50YXRpb24oKCkgPT4gKHtcbi8vICAgICBnZXRFbnZpcm9ubWVudDogamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuLy8gICAgICAgZ2V0U3BhY2U6IGplc3QuZm4oKS5tb2NrSW1wbGVtZW50YXRpb24oKCkgPT4gKHtcbi8vICAgICAgICAgZ2V0RW50cnk6IGplc3QuZm4oKS5tb2NrSW1wbGVtZW50YXRpb24oKCkgPT4gKHtcbi8vICAgICAgICAgICBuYW1lOiAndmFsdWUnXG4vLyAgICAgICAgIH0pKVxuLy8gICAgICAgfSkpXG4vLyAgICAgfSkpXG4vLyAgIH0pKVxuLy8gfTtcblxuY29uc3QgZXZlbnQgPSB7XG4gIHJlc291cmNlOiAnL3JlY2lwZXMve2lkfScsXG4gIHBhdGg6ICcvcmVjaXBlcy9yZWNpcGVfaWQnLFxuICBodHRwTWV0aG9kOiAnUFVUJyxcbiAgaGVhZGVyczoge1xuICAgIGFjY2VwdDogJyovKicsXG4gICAgJ2FjY2VwdC1lbmNvZGluZyc6ICdnemlwLCBkZWZsYXRlLCBicicsXG4gICAgJ2FjY2VwdC1sYW5ndWFnZSc6ICdlbi1VUyxlbjtxPTAuOSxsYTtxPTAuOCxzaztxPTAuNycsXG4gICAgQXV0aG9yaXphdGlvbjogJ1RPS0VOJyxcbiAgICAnY29udGVudC10eXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcsXG4gICAgb3JpZ2luOiAnaHR0cHM6Ly90ZXN0LnJlY2lwZXMucGxpZGR5LmNvbScsXG4gICAgcmVmZXJlcjogJ2h0dHBzOi8vdGVzdC5yZWNpcGVzLnBsaWRkeS5jb20vJ1xuICB9LFxuICBwYXRoUGFyYW1ldGVyczogeyBpZDogJ3JlY2lwZV9pZCcgfSxcbiAgcmVxdWVzdENvbnRleHQ6IHtcbiAgICByZXNvdXJjZVBhdGg6ICcvcmVjaXBlcy97aWR9JyxcbiAgICBodHRwTWV0aG9kOiAnUFVUJyxcbiAgICBwYXRoOiAnL3Rlc3QvcmVjaXBlcy9yZWNpcGVfaWQnLFxuICAgIGFjY291bnRJZDogJ0FDQ09VTlRfSUQnLFxuICAgIHByb3RvY29sOiAnSFRUUC8xLjEnLFxuICAgIHN0YWdlOiAndGVzdCdcbiAgfSxcbiAgYm9keTogJ3tcIm5hbWVcIjpcInZhbHVlXCJ9J1xufTtcblxuZGVzY3JpYmUoJ1VwZGF0ZVJlY2lwZScsICgpID0+IHtcbiAgaXQoJ2hhbmRsZXMgdGhlIFBVVCByZXF1ZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdQRU5ESU5HIFRFU1QnKTtcbiAgICAvLyBjb25zdCBjb250ZW50ZnVsU3B5ID0gamVzdFxuICAgIC8vICAgLnNweU9uKGNvbnRlbnRmdWwsICdjcmVhdGVDbGllbnQnKVxuICAgIC8vICAgLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiB7XG4gICAgLy8gICAgIGNyZWF0ZUNsaWVudDogamVzdC5mbigpLm1vY2tSZXR1cm5WYWx1ZSgoKSA9PiAoe1xuICAgIC8vICAgICAgIGdldEVudmlyb25tZW50OiBqZXN0LmZuKCkubW9ja1JldHVyblZhbHVlKCgpID0+ICh7XG4gICAgLy8gICAgICAgICBnZXRTcGFjZTogamVzdC5mbigpLm1vY2tSZXR1cm5WYWx1ZSgoKSA9PiAoe1xuICAgIC8vICAgICAgICAgICBnZXRFbnRyeTogamVzdC5mbigpLm1vY2tSZXR1cm5WYWx1ZSgoKSA9PiAoe1xuICAgIC8vICAgICAgICAgICAgIG5hbWU6ICd2YWx1ZSdcbiAgICAvLyAgICAgICAgICAgfSkpXG4gICAgLy8gICAgICAgICB9KSlcbiAgICAvLyAgICAgICB9KSlcbiAgICAvLyAgICAgfSkpO1xuICAgIC8vICAgfSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKGV2ZW50IGFzIHVua25vd24gYXMgQVBJR2F0ZXdheUV2ZW50KTtcbiAgICBleHBlY3QoSlNPTi5wYXJzZShyZXN1bHQuYm9keSkpLnRvQmUoZXZlbnQuYm9keSk7XG4gIH0pO1xufSk7XG4iXX0=