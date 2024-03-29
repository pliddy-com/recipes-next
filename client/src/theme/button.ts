import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/values/colors';
import { fontWeightBold, sansFontFamily } from './values/fontface';

import baseTheme from './base';

const buttonThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.logo': {
            color: colors.common.white,
            display: 'flex',
            fontFamily: sansFontFamily,
            fontSize: '1.125rem',
            fontWeight: fontWeightBold,
            letterSpacing: '.2px',
            marginRight: 'auto',
            marginLeft: '-3px',
            textTransform: 'capitalize',
            wordSpacing: '.0625rem'
          },
          '&.menu-button': {
            marginLeft: '0.5rem',
            menuIcon: { ml: 'auto' },
            color: colors.common.white,
            '& .dropdown-icon': {
              marginLeft: '0.5rem'
            },
            '&.auth': {
              minWidth: '6.5625rem'
            }
          },
          '&.submit': {
            marginTop: '1rem',
            padding: '.75rem'
          },
          '&.Mui-focusVisible': {
            color: 'yellow'
          },
          '&.user': {
            color: colors.common.white,
            marginLeft: '.5rem',
            '&.Mui-disabled': {
              color: baseTheme.palette.primary.contrastText
            }
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.logo': {
            marginRight: 'auto',
            marginLeft: '-4px'
          }
        }
      }
    }
  }
};

export default buttonThemeOptions;
