import '@testing-library/jest-dom';

import { notNullOrUndefined } from './typeUtils';

describe('in typeUtils.ts', () => {
  describe('notNullOrUndefined()', () => {
    const nullValue = null;
    const undefinedValue = undefined;
    const validValue = 1;

    it('returns true if value is null', () => {
      const result = notNullOrUndefined(nullValue);
      expect(result).toBe(false);
    });

    it('returns true if value is undefined', () => {
      const result = notNullOrUndefined(undefinedValue);
      expect(result).toBe(false);
    });

    it('returns false if value exists', () => {
      const result = notNullOrUndefined(validValue);
      expect(result).toBe(true);
    });
  });
});
