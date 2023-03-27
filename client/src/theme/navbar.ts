import { ThemeOptions } from '@mui/material/styles';

const navbarThemeOptions: ThemeOptions = {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          '&.menu': {
            minHeight: '3.5rem'
          }
        }
      }
    }
  }
};

export default navbarThemeOptions;
