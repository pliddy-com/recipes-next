import Head from 'next/head';
import responsiveImage, { Breakpoints } from 'lib/responsiveImage';

interface PreloadTagsProps {
  breakpoints: Breakpoints[];
  url: string;
  defaultWidth: number;
}

const PreloadTags = ({ breakpoints, url, defaultWidth }: PreloadTagsProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  return breakpoints && breakpoints.length > 0 && url ? (
    <Head>
      {breakpoints.map(
        ({ viewMin, imgWidth }, index, breakpoints) =>
          url && (
            <link
              rel="preload"
              href={`${url}?w=${defaultWidth * 2}&fm=webp&q=75`}
              as="image"
              sizes={`${imgWidth}px`}
              imageSrcSet={createSrcSet({ url, imgWidth })}
              key={`${url}-${viewMin || imgWidth}-preload`}
              media={createMediaQuery({
                viewMin,
                index,
                breakpoints,
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
