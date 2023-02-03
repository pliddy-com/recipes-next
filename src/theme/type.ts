import fontFaceOverrides from 'theme/fontface';

const baseFontSize = 16;
const buttonFontSize = 14;
const fontWeightRegular = 400;
const fontWeightBold = 500;
const fontFamily = 'Inter';

const typeTheme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily,
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
    fontFamily,
    fontWeightBold,
    fontWeightRegular,
    fontSize: baseFontSize,
    htmlFontSize: 18,
    body2: {
      fontSize: `${baseFontSize / baseFontSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 24 / baseFontSize,
    },
    body1: {
      fontSize: `${baseFontSize / baseFontSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 24 / baseFontSize,
    },
    h1: {
      fontFamily,
      fontSize: `${36 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily,
      fontSize: `${28 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily,
      fontSize: `${22 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.125,
    },
    h4: {
      fontFamily,
      fontSize: `${20 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily,
      fontSize: `${18 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    h6: {
      fontFamily,
      fontSize: '1rem',
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
    button: {
      fontFamily,
      fontSize: `${18 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
    },
  },
};

export default typeTheme;
