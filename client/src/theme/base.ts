import { createTheme } from '@mui/material/styles';

import colors from 'theme/values/colors';
import { sansFontFamily, serifFontFamily } from 'theme/values/fontface';

const baseTheme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 960,
      xl: 1200
    }
  },
  palette: {
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText
    },
    secondary: {
      main: colors.secondary.main
    },
    error: {
      main: colors.error.main
    }
  },
  typography: {
    fontFamily: serifFontFamily,
    fontSize: 18,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    htmlFontSize: 18,
    h1: {
      fontFamily: sansFontFamily,
      fontWeight: 500,
      lineHeight: 1.25,
      fontSize: '2.2rem'
    },
    h2: {
      fontWeight: 500,
      lineHeight: 1.25,
      fontSize: '1.8rem'
    },
    h3: {
      fontWeight: 400,
      lineHeight: 1.125,
      fontSize: '1.4rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.25
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.25,
      fontSize: '1.1rem'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.25
    }
  }
});

export default baseTheme;
