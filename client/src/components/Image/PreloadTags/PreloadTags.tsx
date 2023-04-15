import Head from 'next/head';
import {
  AspectRatio,
  Breakpoints,
  calculateAspectRatio,
  createMediaQuery,
  createSrcSet
} from 'lib/responsiveImage';

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
              href={`${url}?w=${defaultWidth * 2}&h=${
                defaultHeight * 2
              }&fm=webp&q=75`}
              as="image"
              sizes={`${imgWidth}px`}
              imageSrcSet={createSrcSet({ url, imgWidth })}
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
