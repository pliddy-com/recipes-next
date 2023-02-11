import PreloadTags from 'components/PreloadTags/PreloadTags';

import responsiveImage, { Breakpoints } from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/generated/graphql';

export interface ImageProps {
  image: ImageDefaultFragment;
  breakpoints: Breakpoints[];
  preload?: boolean;
}

const DynamicImage = ({ image, breakpoints, preload = false }: ImageProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  const { url, description: alt, height: imgHeight, width: imgWidth } = image;

  return breakpoints && url && imgWidth && imgHeight && alt ? (
    <>
      {preload && <PreloadTags breakpoints={breakpoints} url={url} />}
      <picture>
        {breakpoints.map(({ viewMin, imgWidth }, index, breakpoints) => {
          return (
            <source
              key={`${url}-${viewMin || imgWidth}-source`}
              media={createMediaQuery({
                viewMin,
                index,
                breakpoints,
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
