import { ThemeOptions } from '@mui/material/styles';
import baseTheme from 'theme/base';

const { breakpoints } = baseTheme ?? {};

const navbarThemeOptions: ThemeOptions = {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          '&.navbar': {
            '& .mobile-nav': {
              display: 'block',
              [breakpoints.up('md')]: {
                display: 'none'
              }
            },
            '& .desktop-nav': {
              display: 'none',
              [breakpoints.up('md')]: {
                display: 'block'
              }
            }
          }
        }
      }
    }
  }
};

export default navbarThemeOptions;
