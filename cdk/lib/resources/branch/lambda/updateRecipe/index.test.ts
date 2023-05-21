import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './index';
import event from './testPayload.json';
import * as entries from '../lib/entries';

jest.createMockFromModule('../lib/entries');
jest.mock('node-fetch', () => jest.fn().mockResolvedValue({}));
jest.mock('../lib/contentful');

const responseSpy = jest.spyOn(entries, 'getResponse');

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('in updateRecipe/index.handler', () => {
  const payload = JSON.parse(event.body);

  const entrySpy = jest
    .spyOn(entries, 'updateEntry')
    .mockImplementationOnce(() => payload);

  describe('when handler() is called', () => {
    it('returns a proper response', async () => {
      const expected = entries.getResponse({
        statusCode: 200,
        body: event.body
      });

      const result = await handler(event as unknown as APIGatewayEvent);

      expect(entrySpy).toBeCalled();
      expect(responseSpy).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('when the event method is not PUT', () => {
    it('it returns a 405 response', async () => {
      const testEvent = {
        ...event,
        httpMethod: 'GET'
      };

      const expected = entries.getResponse({
        statusCode: 405,
        body: JSON.stringify({
          message: `${testEvent.httpMethod} is not allowed.`
        })
      });

      const result = await handler(testEvent as unknown as APIGatewayEvent);
      expect(responseSpy).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('when the event does not contain an id path parameter', () => {
    it('it returns a 400 response', async () => {
      const testEvent = {
        ...event,
        pathParameters: { id: undefined }
      };

      const expected = entries.getResponse({
        statusCode: 400,
        body: JSON.stringify({ message: 'No recipe specified.' })
      });

      const result = await handler(testEvent as unknown as APIGatewayEvent);
      expect(responseSpy).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('when they payload does not include a recipe', () => {
    it('it returns a 401 response', async () => {
      const testEvent = {
        ...event,
        body: undefined
      };

      const id = 'UPi7NotPy5eJLOltfyocJ';

      const expected = entries.getResponse({
        statusCode: 401,
        body: JSON.stringify({ message: `Recipe ${id} is not available.` })
      });

      const result = await handler(testEvent as unknown as APIGatewayEvent);

      expect(responseSpy).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('when updateEntry returns and error', () => {
    it('it returns a 500 response', async () => {
      const error = new Error('500 error');

      const expected = entries.getResponse({
        statusCode: 500,
        body: JSON.stringify(error)
      });

      const entrySpy = jest
        .spyOn(entries, 'updateEntry')
        .mockRejectedValue(() => error);

      try {
        await handler(event as unknown as APIGatewayEvent);
      } catch (err) {
        expect(err).toEqual(expected);
        expect(entrySpy).toBeCalled();
      }
    });
  });
});
