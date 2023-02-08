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
              rel="preload"
              as="image"
              href={url}
              imageSrcSet={createSrcSet({ url, imgWidth })}
              media={createMediaQuery({
                viewMin,
                index,
                propList,
              })}
              key={`${url}-${viewMin || imgWidth}-preload`}
              imageSizes={`${imgWidth}px`}
            />
          )
      )}
    </Head>
  ) : null;
};

export default PreloadTags;
