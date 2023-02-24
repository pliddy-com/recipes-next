import PreloadTags from 'components/Image/PreloadTags/PreloadTags';

import responsiveImage, { Breakpoints } from 'lib/responsiveImage';

import { ImageDefaultFragment } from 'types/queries';

export interface ImageProps {
  image: ImageDefaultFragment;
  breakpoints: Breakpoints[];
  preload?: boolean;
}

const DynamicImage = ({ image, breakpoints, preload = false }: ImageProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  const { url, description: alt, height: imgHeight, width: imgWidth } = image;

  const defaultWidth = breakpoints[0].imgWidth;

  return breakpoints && url && imgWidth && imgHeight && alt ? (
    <>
      {preload && (
        <PreloadTags
          breakpoints={breakpoints}
          url={url}
          defaultWidth={defaultWidth}
        />
      )}
      <picture style={{ height: '100%' }}>
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
          height={defaultWidth * 0.75}
          loading={preload ? 'eager' : 'lazy'}
          src={`${url}?w=${defaultWidth * 2}&fm=webp&q=75`}
          style={{
            width: '100%',
            height: 'auto',
            flexShrink: 0,
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
          }}
          width={defaultWidth}
          fetchpriority={preload ? 'high' : 'auto'}
        />
      </picture>
    </>
  ) : null;
};

export default DynamicImage;
