export const regularSansFontPath = '/fonts/Inter-Regular.ttf';
export const boldSansFontPath = '/fonts/Inter-Medium.ttf';
export const normalSerifFontPath = '/fonts/Piazzolla.ttf';
export const italicSerifFontPath = '/fonts/Piazzolla-Italic.ttf';
export const fontWeightRegular = 400;
export const fontWeightBold = 600;

const SansNormal = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: ${fontWeightRegular};
  src: url(${regularSansFontPath}) format("truetype-variations")
`;

const SansItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-variation-settings: 'ital' 1;
  font-synthesis: none;   
  font-weight: ${fontWeightRegular};
  src: url(${regularSansFontPath}) format("truetype-variations")
`;

const SansBold = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: ${fontWeightBold};
  src: url(${boldSansFontPath}) format("truetype-variations")
`;

const SansBoldItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-synthesis: none;   
  font-variation-settings: 'ital' 1;
  font-weight: ${fontWeightBold};
  src: url(${boldSansFontPath}) format("truetype-variations")
`;

const SerifNormal = `
  font-display: swap;
  font-family: 'Piazzolla';
  font-weight: ${fontWeightRegular};
  src: url(${normalSerifFontPath}) format("truetype-variations")
`;

const SerifItalic = `
  font-display: swap;
  font-family: 'Piazzolla';
  font-style: italic;
  font-variation-settings: 'ital' 1;
  font-synthesis: none;   
  font-weight: ${fontWeightRegular};
  src: url(${italicSerifFontPath}) format("truetype-variations")
`;

const SerifBold = `
  font-display: swap;
  font-family: 'Piazzolla';
  font-weight: ${fontWeightBold};
  src: url(${normalSerifFontPath}) format("truetype-variations")
`;

const SerifBoldItalic = `
  font-display: swap;
  font-family: 'Piazzolla';
  font-style: italic;
  font-synthesis: none;   
  font-variation-settings: 'ital' 1;
  font-weight: ${fontWeightBold};
  src: url(${italicSerifFontPath}) format("truetype-variations")
`;

export const fontFaceOverrides = `
  @font-face {${SerifNormal}}
  @font-face {${SerifItalic}}
  @font-face {${SerifBold}}
  @font-face {${SerifBoldItalic}}
  @font-face {${SansNormal}}
  @font-face {${SansItalic}}
  @font-face {${SansBold}}
  @font-face {${SansBoldItalic}}
`;

// export default fontFace;
