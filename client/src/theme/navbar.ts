import { ThemeOptions } from '@mui/material/styles';
import baseTheme from 'theme/base';

const { breakpoints } = baseTheme ?? {};

const navbarThemeOptions: ThemeOptions = {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          '&.navbar': {
            minHeight: '3.5rem',
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
          },
          '&.userBar': {
            background: baseTheme.palette.primary.light,
            justifyContent: 'flex-end',
            minHeight: '2.625rem',
            paddingRight: '1.6875rem',
            '& .MuiButton-root': {
              '&.edit': {
                margin: '0.5rem 0 0.5rem 0.5rem'
              }
            }
          }
        }
      }
    }
  }
};

export default navbarThemeOptions;
