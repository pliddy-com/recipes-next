export interface Breakpoints {
  viewMin?: number;
  imgWidth: number;
}

export interface createSrcSetProps {
  url: string;
  imgWidth?: number;
}

export interface createMediaQueryProps {
  viewMin?: number;
  index: number;
  breakpoints: Breakpoints[];
}

export const createSrcSet = ({ url, imgWidth }: createSrcSetProps) => {
  return (
    url &&
    `${url}?${imgWidth && `w=${imgWidth}&`}fm=webp 1x, ${url}?${
      imgWidth && `w=${imgWidth * 2}&`
    }fm=webp 2x`
  );
};

export const createMediaQuery = ({
  viewMin,
  index,
  breakpoints,
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

const moduleExports = { createSrcSet, createMediaQuery };

export default moduleExports;
