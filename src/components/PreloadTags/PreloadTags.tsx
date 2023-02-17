import Head from 'next/head';
import responsiveImage, { Breakpoints } from 'lib/responsiveImage';

interface PreloadTagsProps {
  breakpoints: Breakpoints[];
  url: string;
}

const PreloadTags = ({ breakpoints, url }: PreloadTagsProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  return breakpoints && breakpoints.length > 0 && url ? (
    <Head>
      {breakpoints.map(
        ({ viewMin, imgWidth }, index, breakpoints) =>
          url && (
            <link
              as="image"
              href={url}
              imageSizes={`${imgWidth}px`}
              imageSrcSet={createSrcSet({ url, imgWidth })}
              key={`${url}-${viewMin || imgWidth}-preload`}
              media={createMediaQuery({
                viewMin,
                index,
                breakpoints,
              })}
              rel="preload"
            />
          )
      )}
    </Head>
  ) : null;
};

export default PreloadTags;