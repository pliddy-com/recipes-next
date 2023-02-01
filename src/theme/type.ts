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
    //     body1: {
    //       fontSize: `${20 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //     },
    //     body2: {
    //       fontSize: `${16 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 24 / 16,
    //     },
    //     button: {
    //       fontSize: `${16 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 16,
    //       textTransform: 'none',
    //     },
    //     caption: {
    //       fontSize: `${14 / baseFontSize}rem`,
    //       fontWeight: fontWeightNormal,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 14,
    //     },
    //     h1: {
    //       fontSize: `${48 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: '-0.4px',
    //       lineHeight: 64 / 48,
    //     },
    //     h2: {
    //       fontSize: `${40 / baseFontSize}rem`,
    //       fontWeight: fontWeightBold,
    //       letterSpacing: 0,
    //       lineHeight: 56 / 40,
    //     },
    //     h3: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${32 / baseFontSize}rem`,
    //       letterSpacing: 0,
    //       lineHeight: 48 / 32,
    //     },
    //     h4: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${26 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 40 / 26,
    //     },
    //     h5: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${20 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //     },
    //     h6: {
    //       fontWeight: fontWeightBold,
    //       fontSize: `${16 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 24 / 16,
    //     },
    //     overline: {
    //       color: colors.textAccent,
    //       fontWeight: fontWeightNormal,
    //       fontSize: `${14 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 20 / 14,
    //       textTransform: 'none',
    //     },
    //     subtitle1: {
    //       color: colors.textAccent,
    //       fontWeight: fontWeightBold,
    //       fontSize: `${20 / baseFontSize}rem`,
    //       letterSpacing: '.15px',
    //       lineHeight: 32 / 20,
    //       textTransform: 'none',
    //     },
  },
};

export default typeTheme;
