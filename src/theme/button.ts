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
          },
        },
      },
    },
  },
};

export default buttonTheme;
