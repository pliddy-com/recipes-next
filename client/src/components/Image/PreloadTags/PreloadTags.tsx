import Head from 'next/head';
import {
  Breakpoints,
  calculateAspectRatio,
  createMediaQuery,
  createSrcSet
} from 'lib/responsiveImage';

import { AspectRatio } from 'theme/values/images';

interface PreloadTagsProps {
  aspectRatio?: AspectRatio;
  breakpoints: Breakpoints[];
  defaultWidth: number;
  url: string;
}

const PreloadTags = ({
  aspectRatio = '4 / 3',
  breakpoints,
  url,
  defaultWidth
}: PreloadTagsProps) => {
  const defaultHeight = Math.ceil(
    defaultWidth * calculateAspectRatio({ aspectRatio })
  );

  return breakpoints && breakpoints.length > 0 && url ? (
    <Head>
      {breakpoints.map(
        ({ viewMin, imgWidth }, index, breakpoints) =>
          url && (
            <link
              rel="preload"
              href={`${url}?w=${defaultWidth}&h=${defaultHeight}&fm=webp&q=75`}
              as="image"
              sizes={`${imgWidth}px`}
              imageSrcSet={createSrcSet({ aspectRatio, imgWidth, url })}
              key={`${url}-${viewMin || imgWidth}-preload`}
              media={createMediaQuery({
                viewMin,
                index,
                breakpoints
              })}
              type="image/webp"
              fetchpriority="high"
            />
          )
      )}
    </Head>
  ) : null;
};

export default PreloadTags;
