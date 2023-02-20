export const regularSansFontPath = '/fonts/Heebo-VariableFont_wght.ttf';
export const regularSerifFontPath =
  '/fonts/SourceSerif4-VariableFont_opsz,wght.ttf';

export const baseFontSize = 18;
export const baseRemSize = 16;
export const buttonFontSize = 14;
export const fontWeightBold = 600;
export const fontWeightRegular = 400;
export const sansFontFamily =
  'Heebo, "Helvetica Neue", Helvetica, Arial, sans-serif;';
export const serifFontFamily = 'SourceSerif4';

const SansNormal = `
  font-display: swap;
  font-family: 'Heebo';
  font-weight: ${fontWeightRegular};
  src: url(${regularSansFontPath}) format("truetype-variations")
`;

const SansBold = `
  font-display: swap;
  font-family: 'Heebo';
  font-weight: ${fontWeightBold};
  src: url(${regularSansFontPath}) format("truetype-variations")
`;

const SerifNormal = `
  font-display: swap;
  font-family: 'SourceSerif4';
  font-weight: ${fontWeightRegular};
  src: url(${regularSerifFontPath}) format("truetype-variations")
`;

const SerifBold = `
  font-display: swap;
  font-family: 'SourceSerif4';
  font-weight: ${fontWeightBold};
  src: url(${regularSerifFontPath}) format("truetype-variations")
`;

export const fontFaceOverrides = `
  @font-face {${SerifNormal}}
  @font-face {${SerifBold}}
  @font-face {${SansNormal}}
  @font-face {${SansBold}}
`;
