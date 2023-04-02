/**
 *  getPagedRecipes parsing function (parse in realtime instead of pre-rendering array of arrays?)
 */

export interface PaginateResultsProps {
  data: (object | null)[];
  pageSize: number;
}

export const paginateResults = ({ data, pageSize }: PaginateResultsProps) => {
  const numPages = Math.ceil(data.length / pageSize);
  const results = [];

  for (let pageNum = 0; pageNum < numPages; pageNum++) {
    const startItem = pageNum * pageSize;
    const pageData = data.slice(startItem, startItem + pageSize);
    results.push(pageData);
  }

  return results;
};

/**
 *  LoadNext function for infinite scrolling recipes
 */

export interface LoadNextProps {
  pagedResults: (object | null)[][];
  pageNum: number;
  pageSize: number;
  setDataCallback: (pagedResults: (object | null)[][]) => void;
  setPageNumCallback: (num: number) => void;
}

export const loadNext = ({
  pagedResults,
  pageNum,
  setDataCallback,
  setPageNumCallback
}: LoadNextProps): void => {
  if (pageNum < pagedResults.length) setPageNumCallback(pageNum + 1);
  setDataCallback(pagedResults.slice(0, pageNum + 1));
};
