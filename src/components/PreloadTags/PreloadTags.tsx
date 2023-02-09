import Head from 'next/head';
import responsiveImage, { WidthProps } from 'lib/responsiveImage';

interface PreloadTagsProps {
  props: WidthProps[];
  url: string;
}

const PreloadTags = ({ props, url }: PreloadTagsProps) => {
  const { createSrcSet, createMediaQuery } = responsiveImage;

  return props && props.length > 0 && url ? (
    <Head>
      {props.map(
        ({ viewMin, imgWidth }, index, propList) =>
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
                propList,
              })}
              rel="preload"
            />
          )
      )}
    </Head>
  ) : null;
};

export default PreloadTags;
