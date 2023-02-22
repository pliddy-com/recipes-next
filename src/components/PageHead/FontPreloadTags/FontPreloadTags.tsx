import Head from 'next/head';

import { regularSansFontPath, regularSerifFontPath } from 'theme/fontface';

const FontPreloadTags = () => (
  <Head>
    <link
      rel="preload"
      href={regularSansFontPath}
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href={regularSerifFontPath}
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />
  </Head>
);

export default FontPreloadTags;
