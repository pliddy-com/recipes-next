import { ImageDefaultFragment } from 'types/generated/graphql';

interface ImageProps {
  image: ImageDefaultFragment;
  lazy?: boolean;
}

const Image = ({ image }: ImageProps) => {
  if (!image) return null;

  const {
    url,
    description: alt,
    height: imgHeight,
    width: imgWidth,
  } = image ?? {};

  const src400 = `${url}?w=400&fm=webp`;
  const src600 = `${url}?w=600&fm=webp`;

  const srcDefault = src400;

  return url && imgWidth && imgHeight ? (
    <picture>
      {/* <source
        media="(min-width: 1200px)"
        srcSet={`${src400} 400w`}
        sizes="400px"
      /> */}
      {/* <source
        media="(min-width: 600px)"
        srcSet={`${src400} 400w`}
        sizes="400px"
      /> */}
      {/* <source
        media="(min-width: 899px)"
        srcSet={`${src400} 400w`}
        sizes="800px"
      /> */}
      <source
        media="(min-width: 600px)"
        srcSet={`${src400} 400w`}
        sizes="400px"
      />
      <source
        media="(min-width: 400px)"
        srcSet={`${src600} 600w`}
        sizes="600px"
      />
      <source
        media="(min-width: 320px)"
        srcSet={`${src400} 400w`}
        sizes="400px"
      />

      <img
        alt={alt || ''}
        height={imgHeight}
        src={srcDefault}
        style={{ maxWidth: '100%', height: 'auto' }}
        width={imgWidth}
      />
    </picture>
  ) : null;
};

export default Image;
