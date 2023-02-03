import { ImageDefaultFragment } from 'types/generated/graphql';

interface WidthProps {
  viewMin: number;
  imgWidth: number;
}

interface ImageProps {
  image: ImageDefaultFragment;
  widths: WidthProps[];
}

const Image = ({ image, widths }: ImageProps) => {
  if (!image) return null;

  const {
    url,
    description: alt,
    height: imgHeight,
    width: imgWidth,
  } = image ?? {};

  // TODO: add second source tag for each item with double width and '2x' appended

  return url && imgWidth && imgHeight ? (
    <picture>
      {widths.map(({ viewMin, imgWidth }) => (
        <source
          key={viewMin}
          media={`(min-width: ${viewMin}px)`}
          srcSet={`${url}?w=${imgWidth}&fm=webp&q=75 1x, ${url}?w=${
            imgWidth * 2
          }&fm=webp&q=75 2x`}
          sizes={`${imgWidth}px`}
        />
      ))}
      <img
        alt={alt || ''}
        height={imgHeight}
        src={url}
        style={{ maxWidth: '100%', height: 'auto' }}
        width={imgWidth}
      />
    </picture>
  ) : null;
};

export default Image;
