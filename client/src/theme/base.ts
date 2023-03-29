import { createTheme } from '@mui/material/styles';

import colors from 'theme/colors';
import { sansFontFamily, serifFontFamily } from 'theme/fontface';

const baseTheme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  },
  mixins: {
    toolbar: {
      minHeight: '3.5rem'
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
      main: colors.primary.main
    },
    secondary: {
      main: colors.secondary.main
    },
    error: {
      main: colors.error.main
    }
  },
  // transitions: {
  //   duration: {
  //     shortest: 100,
  //     shorter: 125,
  //     short: 150,
  //     // most basic recommended timing
  //     standard: 200,
  //     // this is to be used in complex animations
  //     complex: 300,
  //     // recommended when something is entering screen
  //     enteringScreen: 200,
  //     // recommended when something is leaving screen
  //     leavingScreen: 150
  //   },
  //   // So we have `transition: none;` everywhere
  //   create: () => 'none'
  // },
  typography: {
    fontFamily: serifFontFamily,
    fontSize: 16,
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
