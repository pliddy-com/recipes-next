import { ThemeOptions } from '@mui/material/styles';

const gridTheme: ThemeOptions = {
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          '&.flex': {
            display: 'flex',
          },
        },
      },
    },
  },
};

export default gridTheme;
