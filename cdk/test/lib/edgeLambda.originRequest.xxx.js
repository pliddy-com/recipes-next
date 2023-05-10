"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edgeLambda_originRequest_1 = require("../../lib/resources/branch/edgeLambda.originRequest");
const getEvent = ({ originalUri }) => {
    const event = {
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
const getExpected = ({ expectedUri }) => {
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
        const result = await (0, edgeLambda_originRequest_1.handler)(event);
        expect(result).toEqual(expected);
    });
    it('returns the original uri for files (with ".")', async () => {
        const originalUri = '/test.js';
        const expectedUri = originalUri;
        const event = getEvent({ originalUri });
        const expected = getExpected({ expectedUri });
        const result = await (0, edgeLambda_originRequest_1.handler)(event);
        expect(result).toEqual(expected);
    });
    it('returns the original uri for the root path ("/")', async () => {
        const originalUri = '/';
        const expectedUri = originalUri;
        const event = getEvent({ originalUri });
        const expected = getExpected({ expectedUri });
        const result = await (0, edgeLambda_originRequest_1.handler)(event);
        expect(result).toEqual(expected);
    });
    it('adds .html to default requests without a trailing slash', async () => {
        const originalUri = '/tags';
        const expectedUri = `${originalUri}.html`;
        const event = getEvent({ originalUri });
        const expected = getExpected({ expectedUri });
        const result = await (0, edgeLambda_originRequest_1.handler)(event);
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZUxhbWJkYS5vcmlnaW5SZXF1ZXN0Lnh4eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkZ2VMYW1iZGEub3JpZ2luUmVxdWVzdC54eHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrR0FBOEU7QUFJOUUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBMkIsRUFBRSxFQUFFO0lBQzVELE1BQU0sS0FBSyxHQUEyQjtRQUNwQyxPQUFPLEVBQUU7WUFDUDtnQkFDRSxFQUFFLEVBQUU7b0JBQ0YsTUFBTSxFQUFFO3dCQUNOLHNCQUFzQixFQUFFLHdCQUF3Qjt3QkFDaEQsY0FBYyxFQUFFLGdCQUFnQjt3QkFDaEMsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsU0FBUyxFQUFFLFdBQVc7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxRQUFRLEVBQUUsU0FBUzt3QkFDbkIsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsV0FBVyxFQUFFLEVBQUU7d0JBQ2YsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsR0FBRyxFQUFFLFdBQVc7cUJBQ2pCO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQTJCLEVBQUUsRUFBRTtJQUMvRCxNQUFNLFFBQVEsR0FBRztRQUNmLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixXQUFXLEVBQUUsRUFBRTtRQUNmLEdBQUcsRUFBRSxXQUFXO0tBQ2pCLENBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixFQUFFLENBQUMsMERBQTBELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDeEUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGtDQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM3RCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDL0IsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDeEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUU5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsa0NBQU8sRUFBQyxLQUFLLENBQUMsQ0FBQztRQUVwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2hFLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxrQ0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseURBQXlELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdkUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzVCLE1BQU0sV0FBVyxHQUFHLEdBQUcsV0FBVyxPQUFPLENBQUM7UUFDMUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxrQ0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZXIgfSBmcm9tICcuLi8uLi9saWIvcmVzb3VyY2VzL2JyYW5jaC9lZGdlTGFtYmRhLm9yaWdpblJlcXVlc3QnO1xuXG5pbXBvcnQgdHlwZSB7IENsb3VkRnJvbnRSZXF1ZXN0RXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJztcblxuY29uc3QgZ2V0RXZlbnQgPSAoeyBvcmlnaW5hbFVyaSB9OiB7IG9yaWdpbmFsVXJpOiBzdHJpbmcgfSkgPT4ge1xuICBjb25zdCBldmVudDogQ2xvdWRGcm9udFJlcXVlc3RFdmVudCA9IHtcbiAgICBSZWNvcmRzOiBbXG4gICAgICB7XG4gICAgICAgIGNmOiB7XG4gICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkaXN0cmlidXRpb25Eb21haW5OYW1lOiAnZGlzdHJpYnV0aW9uRG9tYWluTmFtZScsXG4gICAgICAgICAgICBkaXN0cmlidXRpb25JZDogJ2Rpc3RyaWJ1dGlvbklkJyxcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ29yaWdpbi1yZXF1ZXN0JyxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogJ3JlcXVlc3RJZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgIGNsaWVudElwOiBgMC4wLjAuMGAsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgcXVlcnlzdHJpbmc6ICcnLFxuICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICB1cmk6IG9yaWdpbmFsVXJpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9O1xuXG4gIHJldHVybiBldmVudDtcbn07XG5cbmNvbnN0IGdldEV4cGVjdGVkID0gKHsgZXhwZWN0ZWRVcmkgfTogeyBleHBlY3RlZFVyaTogc3RyaW5nIH0pID0+IHtcbiAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgY2xpZW50SXA6ICcwLjAuMC4wJyxcbiAgICBoZWFkZXJzOiB7fSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHF1ZXJ5c3RyaW5nOiAnJyxcbiAgICB1cmk6IGV4cGVjdGVkVXJpXG4gIH07XG5cbiAgcmV0dXJuIGV4cGVjdGVkO1xufTtcblxuZGVzY3JpYmUoJ09yaWdpblJlcXVlc3QnLCAoKSA9PiB7XG4gIGl0KCdzdHJpcHMgdGhlIHRyYWlsaW5nIHNsYXNoIGFkZHMgLmh0bWwgdG8gZGVmYXVsdCByZXF1ZXN0cycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbFVyaSA9ICcvdGFncy8nO1xuICAgIGNvbnN0IGV4cGVjdGVkVXJpID0gJy90YWdzLmh0bWwnO1xuICAgIGNvbnN0IGV2ZW50ID0gZ2V0RXZlbnQoeyBvcmlnaW5hbFVyaSB9KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IGdldEV4cGVjdGVkKHsgZXhwZWN0ZWRVcmkgfSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKGV2ZW50KTtcblxuICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoZXhwZWN0ZWQpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0aGUgb3JpZ2luYWwgdXJpIGZvciBmaWxlcyAod2l0aCBcIi5cIiknLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxVcmkgPSAnL3Rlc3QuanMnO1xuICAgIGNvbnN0IGV4cGVjdGVkVXJpID0gb3JpZ2luYWxVcmk7XG4gICAgY29uc3QgZXZlbnQgPSBnZXRFdmVudCh7IG9yaWdpbmFsVXJpIH0pO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RXhwZWN0ZWQoeyBleHBlY3RlZFVyaSB9KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZXIoZXZlbnQpO1xuXG4gICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbChleHBlY3RlZCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSBvcmlnaW5hbCB1cmkgZm9yIHRoZSByb290IHBhdGggKFwiL1wiKScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbFVyaSA9ICcvJztcbiAgICBjb25zdCBleHBlY3RlZFVyaSA9IG9yaWdpbmFsVXJpO1xuICAgIGNvbnN0IGV2ZW50ID0gZ2V0RXZlbnQoeyBvcmlnaW5hbFVyaSB9KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IGdldEV4cGVjdGVkKHsgZXhwZWN0ZWRVcmkgfSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKGV2ZW50KTtcblxuICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoZXhwZWN0ZWQpO1xuICB9KTtcblxuICBpdCgnYWRkcyAuaHRtbCB0byBkZWZhdWx0IHJlcXVlc3RzIHdpdGhvdXQgYSB0cmFpbGluZyBzbGFzaCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbFVyaSA9ICcvdGFncyc7XG4gICAgY29uc3QgZXhwZWN0ZWRVcmkgPSBgJHtvcmlnaW5hbFVyaX0uaHRtbGA7XG4gICAgY29uc3QgZXZlbnQgPSBnZXRFdmVudCh7IG9yaWdpbmFsVXJpIH0pO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RXhwZWN0ZWQoeyBleHBlY3RlZFVyaSB9KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZXIoZXZlbnQpO1xuXG4gICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbChleHBlY3RlZCk7XG4gIH0pO1xufSk7XG4iXX0=