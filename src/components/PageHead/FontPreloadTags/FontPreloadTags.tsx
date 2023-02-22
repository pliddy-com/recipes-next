import { regularSansFontPath, regularSerifFontPath } from 'theme/fontface';

const FontPreloadTags = () => (
  <>
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
  </>
);

export default FontPreloadTags;
