import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';

const buttonTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.logo': {
            color: colors.common.white,
            display: 'flex',
            marginRight: 'auto',
            textTransform: 'capitalize',
            fontSize: '1rem',
            fontWeight: '100',
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
