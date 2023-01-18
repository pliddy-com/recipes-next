const regularFontPath = '/fonts/Inter-Regular.ttf';
const mediumFontPath = 'fonts/Inter-Medium.ttf';

const Inter = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: 400;
  src: url(${regularFontPath}) format("truetype-variations")
`;

const InterItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-variation-settings: 'ital' 1;
  font-synthesis: none;   
  font-weight: 400;
  src: url(${regularFontPath}) format("truetype-variations")
`;

const InterBold = `
  font-display: swap;
  font-family: 'Inter';
  font-weight: 500;
  src: url(${mediumFontPath}) format("truetype-variations")
`;

const InterBoldItalic = `
  font-display: swap;
  font-family: 'Inter';
  font-style: italic;
  font-style: italic;
  font-synthesis: none;   
  font-variation-settings: 'ital' 1;
  font-weight: 500;
  src: url(${mediumFontPath}) format("truetype-variations")
`;

const fontFace = `
  @font-face {${Inter}}
  @font-face {${InterItalic}}
  @font-face {${InterBold}}
  @font-face {${InterBoldItalic}}
`;

export default fontFace;
