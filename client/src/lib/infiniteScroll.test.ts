import '@testing-library/jest-dom';

import { paginateResults, loadNext } from './infiniteScroll';

describe('infiniteScroll.ts', () => {
  describe('when paginateResults() is called', () => {
    it('it returns a paginated list of results lists', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const pageSize = 2;

      const expected = [
        [{ id: 1 }, { id: 2 }],
        [{ id: 3 }, { id: 4 }]
      ];

      const results = paginateResults({ data, pageSize });

      expect(expected).toEqual(results);
    });
  });

  describe('when loadNext() is called', () => {
    it('it executes the specified callbacks', () => {
      const setDataCallback = jest.fn();
      const setPageNumCallback = jest.fn();

      const pagedResults = [
        [{ id: 1 }, { id: 2 }],
        [{ id: 3 }, { id: 4 }],
        [{ id: 5 }, { id: 6 }]
      ];
      const pageNum = 0;
      const pageSize = 2;

      const params = {
        pagedResults,
        pageNum,
        pageSize,
        setDataCallback,
        setPageNumCallback
      };

      loadNext({ ...params });

      expect(setPageNumCallback).toHaveBeenCalledWith(pageNum + 1);
      expect(setDataCallback).toHaveBeenCalledWith(
        pagedResults.slice(0, pageNum + 1)
      );
    });
  });
});
