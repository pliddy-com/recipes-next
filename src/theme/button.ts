import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { fontWeightBold, sansFontFamily } from './fontface';

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
            textTransform: 'capitalize',
            wordSpacing: '.0625rem',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.menu': {
            menuIcon: { ml: 'auto' },
            color: colors.common.white,
          },
        },
      },
    },
  },
};

export default buttonThemeOptions;
