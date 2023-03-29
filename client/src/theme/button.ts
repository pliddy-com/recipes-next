import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { fontWeightBold, sansFontFamily } from './fontface';

const buttonThemeOptions: ThemeOptions = {
  components: {
    // MuiButtonBase: {
    //   defaultProps: {
    //     disableRipple: true
    //   }
    // },
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
            }
          },
          '&.Mui-focusVisible': {
            color: 'yellow'
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
