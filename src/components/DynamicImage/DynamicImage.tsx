import PreloadTags from 'components/PreloadTags/PreloadTags';

import responsiveImage, { WidthProps } from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/generated/graphql';

export interface ImageProps {
  image: ImageDefaultFragment;
  props: WidthProps[];
  preload?: boolean;
}

const DynamicImage = ({ image, props, preload = false }: ImageProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  const { url, description: alt, height: imgHeight, width: imgWidth } = image;

  return url && imgWidth && imgHeight && alt ? (
    <>
      {preload && <PreloadTags props={props} url={url} />}
      <picture>
        {props.map(({ viewMin, imgWidth }, index, propList) => {
          return (
            <source
              key={`${url}-${viewMin || imgWidth}-source`}
              media={createMediaQuery({
                viewMin,
                index,
                propList,
              })}
              srcSet={createSrcSet({ url, imgWidth })}
              sizes={`${imgWidth}px`}
            />
          );
        })}
        <img
          alt={alt}
          height={imgHeight}
          loading={preload ? 'eager' : 'lazy'}
          src={url}
          style={{ maxWidth: '100%', height: 'auto' }}
          width={imgWidth}
        />
      </picture>
    </>
  ) : null;
};

export default DynamicImage;
