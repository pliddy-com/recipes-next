import PreloadTags from 'components/DynamicImage/PreloadTags/PreloadTags';

import {
  createMediaQuery,
  createSrcSet,
  WidthProps,
} from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/generated/graphql';

export interface ImageProps {
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
