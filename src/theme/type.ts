import colors from './colors';
import {
  baseFontSize,
  baseRemSize,
  buttonFontSize,
  fontFaceOverrides,
  fontWeightBold,
  fontWeightRegular,
  sansFontFamily,
  serifFontFamily,
} from 'theme/fontface';

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
      fontFamily: sansFontFamily,
      fontSize: `2.25rem`,
      fontWeight: 700,
      lineHeight: 1.25,
      minHeight: `${45 / baseRemSize}rem`,
    },
    h2: {
      borderBottom: `1px solid ${colors.secondary.main}`,
      fontFamily: sansFontFamily,
      fontSize: `${30 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
      paddingBottom: '0.1875rem',
    },
    h3: {
      fontFamily: serifFontFamily,
      fontSize: `${24 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.125,
      marginTop: '1rem',
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
