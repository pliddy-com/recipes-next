import { ThemeOptions } from '@mui/material/styles';

import colors from './colors';
import {
  baseFontSize,
  baseRemSize,
  buttonFontSize,
  fontFaceOverrides,
  fontWeightBold,
  fontWeightRegular,
  sansFontFamily,
  serifFontFamily
} from 'theme/fontface';

const typeThemeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          fontSize: `${buttonFontSize / baseFontSize}rem`,
          fontWeight: fontWeightBold,
          lineHeight: baseFontSize / buttonFontSize
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline dotted',
          textUnderlineOffset: '0.375em',
          fontWeight: fontWeightBold
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'p',
          subtitle2: 'p'
        }
      }
    }
  },
  typography: {
    fontFamily: serifFontFamily,
    fontWeightBold,
    fontWeightRegular,
    fontSize: baseFontSize,
    htmlFontSize: baseFontSize,
    subtitle1: {
      marginBottom: '1.5rem',
      lineHeight: '1.125'
    },
    body2: {
      fontSize: `${(baseFontSize - 2) / baseRemSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 26 / baseFontSize
    },
    body1: {
      fontSize: `${baseFontSize / baseRemSize}rem`,
      fontWeight: fontWeightRegular,
      letterSpacing: '.1px',
      lineHeight: 26 / baseFontSize
    },
    h1: {
      borderBottom: `1px solid ${colors.secondary.main}`,
      marginBottom: '0.25rem',
      paddingBottom: '0.1875rem',
      fontFamily: sansFontFamily,
      fontSize: `${30 / baseRemSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.125
    },
    h2: {
      borderBottom: `1px solid ${colors.secondary.main}`,
      fontFamily: sansFontFamily,
      fontSize: `${24 / baseRemSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25,
      paddingBottom: '0.1875rem',
      marginBottom: '0.5rem'
    },
    h3: {
      fontFamily: serifFontFamily,
      fontSize: `${22 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.125,
      marginBottom: '0.5rem'
    },
    h4: {
      fontFamily: serifFontFamily,
      fontSize: `${21 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25
    },
    h5: {
      fontFamily: serifFontFamily,
      fontSize: `${20 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25
    },
    h6: {
      fontFamily: serifFontFamily,
      fontSize: `${18 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25
    },
    button: {
      fontFamily: sansFontFamily,
      fontSize: `${20 / baseFontSize}rem`,
      fontWeight: fontWeightBold,
      lineHeight: 1.25
    }
  }
};

export default typeThemeOptions;
