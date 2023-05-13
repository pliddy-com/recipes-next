import '@testing-library/jest-dom';

import { hasValue, minToIso, minToTime, toSlug } from './utils';

describe('utils', () => {
  describe('when hasValue() is called', () => {
    const nullValue = null;
    const undefinedValue = undefined;
    const validValue = 1;

    it('it returns true if value is null', () => {
      const result = hasValue(nullValue);
      expect(result).toBe(false);
    });

    it('it returns true if value is undefined', () => {
      const result = hasValue(undefinedValue);
      expect(result).toBe(false);
    });

    it('it returns false if value exists', () => {
      const result = hasValue(validValue);
      expect(result).toBe(true);
    });
  });

  describe('when minToIso() is called', () => {
    it('it returns an ISO formatted duration under an hour', () => {
      const num = 30;
      const res = minToIso(num);

      expect(res).toEqual('PT30M');
    });

    it('it returns an ISO formatted duration over an hour', () => {
      const num = 90;
      const res = minToIso(num);

      expect(res).toEqual('PT1H30M');
    });
  });

  describe('when minToTime() is called', () => {
    it('it returns a human-readable duration under an hour', () => {
      const num = 30;
      const res = minToTime(num);

      expect(res).toEqual('30 min');
    });

    it('it returns a human-readable duration over an hour', () => {
      const num = 90;
      const res = minToTime(num);

      expect(res).toEqual('1 hour 30 min');
    });

    it('it returns a human-readable duration over an hour', () => {
      const num = 120;
      const res = minToTime(num);

      expect(res).toEqual('2 hours');
    });
  });

  describe('when toSlug() is called', () => {
    it('it returns a slugified string', () => {
      const str = 'Sautéed, Baked, & Fried';
      const expected = 'sauteed-baked-and-fried';
      expect(toSlug(str)).toEqual(expected);
    });
  });
});
