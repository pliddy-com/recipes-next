import PreloadTags from 'components/Image/PreloadTags/PreloadTags';

import {
  Breakpoints,
  calculateAspectRatio,
  createSrcSet,
  createMediaQuery
} from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/queries';

import { AspectRatio } from 'theme/values/images';

export interface ImageProps {
  aspectRatio?: AspectRatio;
  breakpoints: Breakpoints[];
  image: ImageDefaultFragment;
  preload?: boolean;
}

const DynamicImage = ({
  aspectRatio = '4 / 3',
  image,
  breakpoints,
  preload = false
}: ImageProps) => {
  const { url, description: alt, height: imgHeight, width: imgWidth } = image;

  const defaultWidth = breakpoints[0].imgWidth;

  const defaultHeight = Math.ceil(
    defaultWidth * calculateAspectRatio({ aspectRatio })
  );

  return breakpoints && url && imgWidth && imgHeight && alt ? (
    <>
      {preload && (
        <PreloadTags
          aspectRatio={aspectRatio}
          breakpoints={breakpoints}
          defaultWidth={defaultWidth}
          url={url}
        />
      )}
      <picture>
        {breakpoints.map(({ viewMin, imgWidth }, index, breakpoints) => {
          return (
            <source
              key={`${url}-${viewMin || imgWidth}-source`}
              media={createMediaQuery({
                viewMin,
                index,
                breakpoints
              })}
              srcSet={createSrcSet({ aspectRatio, imgWidth, url })}
              sizes={`${imgWidth}px`}
            />
          );
        })}
        <img
          alt={alt}
          className="dynamicImage"
          height={defaultHeight}
          loading={preload ? 'eager' : 'lazy'}
          src={`${url}?w=${defaultWidth * 2}&h=${
            defaultHeight * 2
          }&fit=fill&fm=webp&q=75`}
          width={defaultWidth}
          fetchpriority={preload ? 'high' : 'auto'}
        />
      </picture>
    </>
  ) : null;
};

export default DynamicImage;
