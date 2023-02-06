export interface WidthProps {
  viewMin?: number;
  imgWidth: number;
}

export interface createSrcSetProps {
  url: string;
  imgWidth: number;
}

export interface createMediaQueryProps {
  viewMin?: number;
  index: number;
  propList: WidthProps[];
}

export const createSrcSet = ({ url, imgWidth }: createSrcSetProps) => {
  return `${url}?w=${imgWidth}&fm=webp&q=75 1x, ${url}?w=${
    imgWidth * 2
  }&fm=webp&q=75 2x`;
};

export const createMediaQuery = ({
  viewMin,
  index,
  propList,
}: createMediaQueryProps): string => {
  const minQuery = `(min-width: ${viewMin}px)`;
  const prevMin = index > 0 ? propList[index - 1].viewMin : null;
  const maxQuery = index > 0 && prevMin ? `(max-width: ${prevMin - 1}px)` : '';

  const mediaQuery = `${
    index < propList.length - 1 && viewMin ? minQuery : ''
  }${index > 0 && index < propList.length - 1 ? ' and ' : ''}${
    index > 0 ? maxQuery : ''
  }`;

  return mediaQuery;
};

const moduleExports = { createSrcSet, createMediaQuery };

export default moduleExports;
