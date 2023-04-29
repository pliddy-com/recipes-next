import { AspectRatio } from 'theme/values/images';

export interface createSrcSetProps {
  aspectRatio?: AspectRatio;
  imgWidth: number;
  url: string;
}

export const createSrcSet = ({
  aspectRatio = '4 / 3',
  imgWidth,
  url
}: createSrcSetProps) => {
  const imgHeight = Math.ceil(imgWidth * calculateAspectRatio({ aspectRatio }));

  return (
    url &&
    `${url}?${
      imgWidth && `w=${imgWidth}&h=${imgHeight}`
    }&fit=fill&fm=webp&q=75 1x, ${url}?${
      imgWidth && `w=${imgWidth * 2}&h=${imgHeight * 2}`
    }&fit=fill&fm=webp&q=75 2x`
  );
};

export interface Breakpoints {
  viewMin?: number;
  imgWidth: number;
}

export interface createMediaQueryProps {
  viewMin?: number;
  index: number;
  breakpoints: Breakpoints[];
}

export const createMediaQuery = ({
  viewMin,
  index,
  breakpoints
}: createMediaQueryProps): string => {
  const minQuery = viewMin && `(min-width: ${viewMin}px)`;
  const prevMin = index > 0 && breakpoints[index - 1].viewMin;
  const maxQuery = index > 0 && prevMin && `(max-width: ${prevMin - 1}px)`;

  const mediaQuery = `${
    index < breakpoints.length - 1 && viewMin ? minQuery : ''
  }${index > 0 && index < breakpoints.length - 1 ? ' and ' : ''}${
    index > 0 ? maxQuery : ''
  }`;

  return mediaQuery;
};

export const calculateAspectRatio = ({
  aspectRatio
}: {
  aspectRatio: AspectRatio;
}) =>
  aspectRatio
    .toString()
    .split('/')
    .map((value) => parseInt(value, 10))
    .reduce((accumulator, currentValue) => currentValue / accumulator);

// const moduleExports = { createSrcSet, createMediaQuery, calculateAspectRatio };

// export default moduleExports;
