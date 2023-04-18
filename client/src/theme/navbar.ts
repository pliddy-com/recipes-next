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
              [breakpoints.up('lg')]: {
                display: 'none'
              }
            },
            '& .desktop-nav': {
              display: 'none',
              [breakpoints.up('lg')]: {
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
