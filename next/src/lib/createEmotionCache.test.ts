import '@testing-library/jest-dom';
import * as emotionCache from '@emotion/cache';
import createEmotionCache from './createEmotionCache';

jest.mock('@emotion/cache');

describe('api', () => {
  describe('when createEmotionCache() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      const payload = { key: 'css', prepend: true };
      const cacheSpy = jest.spyOn(emotionCache, 'default');

      createEmotionCache();

      expect(cacheSpy).toHaveBeenCalledWith(payload);
    });
  });
});
