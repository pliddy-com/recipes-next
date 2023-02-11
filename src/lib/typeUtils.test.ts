import '@testing-library/jest-dom';

import { hasValue } from './typeUtils';

describe('typeUtils', () => {
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
});
