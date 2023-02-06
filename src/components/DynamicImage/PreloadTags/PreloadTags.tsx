import Head from 'next/head';
import {
  createMediaQuery,
  createSrcSet,
  WidthProps,
} from 'lib/responsiveImage';

export interface PreloadTagsProps {
  props: WidthProps[];
  url: string;
}

// TODO: move PreloadTags to it's own component

export const PreloadTags = ({ props, url }: PreloadTagsProps) => (
  <Head>
    {props.map(({ viewMin, imgWidth }, index, propList) => (
      <link
        rel="preload"
        as="image"
        href={url || ''}
        imageSrcSet={createSrcSet({ url: url || '', imgWidth })}
        media={createMediaQuery({
          viewMin,
          index,
          propList,
        })}
        key={`${url}-${viewMin || imgWidth}-preload`}
        imageSizes={`${imgWidth}px`}
      />
    ))}
  </Head>
);

export default PreloadTags;
