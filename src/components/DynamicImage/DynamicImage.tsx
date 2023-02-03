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

  return url && imgWidth && imgHeight ? (
    <picture>
      {widths.map(({ viewMin, imgWidth }) => (
        <source
          key={viewMin}
          media={`(min-width: ${viewMin}px)`}
          srcSet={`${url}?w=${imgWidth}&fm=webp ${imgWidth}600w`}
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
