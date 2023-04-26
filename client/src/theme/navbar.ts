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
              display: 'flex',
              [breakpoints.up('lg')]: {
                display: 'none'
              },
              '& > *': {
                marginLeft: '1rem'
              }
            },
            '& .desktop-nav': {
              display: 'none',
              [breakpoints.up('lg')]: {
                display: 'flex'
              }
            }
          }
        }
      }
    }
  }
};

export default navbarThemeOptions;
