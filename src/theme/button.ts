import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { serifFontFamily } from './type';

const buttonTheme: ThemeOptions = {
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiButton-root': {
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            paddingBottom: '3px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: serifFontFamily,
          '&.logo': {
            color: colors.common.white,
            display: 'flex',
            fontSize: '1.125rem',
            fontWeight: 600,
            letterSpacing: '.2px',
            marginRight: 'auto',
            paddingTop: '3px',
            textTransform: 'capitalize',
            wordSpacing: '1px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.menu': {
            menuIcon: { ml: 'auto' },
          },
        },
      },
    },
  },
};

export default buttonTheme;
