import {
  fontFaceOverrides,
  fontWeightBold,
  fontWeightRegular,
} from 'theme/fontface';

export const baseFontSize = 18;
export const baseRemSize = 16;
export const buttonFontSize = 14;
export const serifFontFamily = 'Piazzolla';
export const sansFontFamily = 'Inter';

const typeTheme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          fontSize: `${buttonFontSize / baseFontSize}rem`,
          fontWeight: fontWeightBold,
          lineHeight: baseFontSize / buttonFontSize,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline dotted',
          fontWeight: fontWeightBold,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'p',
          subtitle2: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily: serifFontFamily,
    fontWeightBold,
    fontWeightRegular,
    fontSize: baseFontSize,
    htmlFontSize: baseFontSize,
    body2: {
      fontSize: `${baseFontSize / baseRemSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 24 / baseFontSize,
    },
    body1: {
      fontSize: `${baseFontSize / baseRemSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 24 / baseFontSize,
    },
    h1: {
      fontFamily: serifFontFamily,
      fontSize: `${38 / baseFontSize}rem`,
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: serifFontFamily,
      fontSize: `${30 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: serifFontFamily,
      fontSize: `${24 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.125,
    },
    h4: {
      fontFamily: serifFontFamily,
      fontSize: `${22 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: serifFontFamily,
      fontSize: `${20 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h6: {
      fontFamily: serifFontFamily,
      fontSize: '1rem',
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    button: {
      fontFamily: sansFontFamily,
      fontSize: `${20 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
  },
};

export default typeTheme;
