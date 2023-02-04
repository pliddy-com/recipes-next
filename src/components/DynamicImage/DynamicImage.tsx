import Head from 'next/head';
import { ImageDefaultFragment } from 'types/generated/graphql';

interface getSrcSetProps {
  url: string;
  imgWidth: number;
}

const getSrcSet = ({ url, imgWidth }: getSrcSetProps) => {
  return `${url}?w=${imgWidth}&fm=webp&q=75 1x, ${url}?w=${
    imgWidth * 2
  }&fm=webp&q=75 2x`;
};

interface getMediaQueryProps {
  viewMin?: number;
  index: number;
  propList: WidthProps[];
}

const getMediaQuery = ({
  viewMin,
  index,
  propList,
}: getMediaQueryProps): string => {
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

interface PreloadTagsProps {
  props: WidthProps[];
  url: string;
}

const PreloadTags = ({ props, url }: PreloadTagsProps) => (
  <Head>
    {props.map(({ viewMin, imgWidth }, index, propList) => (
      <link
        rel="preload"
        as="image"
        href={url || ''}
        imageSrcSet={getSrcSet({ url: url || '', imgWidth })}
        media={getMediaQuery({
          viewMin,
          index,
          propList,
        })}
        key={`${url}-${viewMin || imgWidth}-preload`}
        imageSizes={`${imgWidth}px`}
      />
    ))}
  </Head>
);

interface WidthProps {
  viewMin?: number;
  imgWidth: number;
}

interface ImageProps {
  image: ImageDefaultFragment;
  props: WidthProps[];
  preload?: boolean;
}

const Image = ({ image, props, preload = false }: ImageProps) => {
  if (!image) return null;

  const {
    url,
    description: alt,
    height: imgHeight,
    width: imgWidth,
  } = image ?? {};

  return url && imgWidth && imgHeight ? (
    <>
      {preload && <PreloadTags props={props} url={url} />}
      <picture>
        {props.map(({ viewMin, imgWidth }, index, propList) => {
          return (
            <source
              key={`${url}-${viewMin || imgWidth}-source`}
              media={getMediaQuery({
                viewMin,
                index,
                propList,
              })}
              srcSet={getSrcSet({ url: url || '', imgWidth })}
              sizes={`${imgWidth}px`}
            />
          );
        })}
        <img
          alt={alt || ''}
          height={imgHeight}
          src={url}
          style={{ maxWidth: '100%', height: 'auto' }}
          width={imgWidth}
        />
      </picture>
    </>
  ) : null;
};

export default Image;
