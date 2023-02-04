import { ThemeOptions } from '@mui/material/styles';

const drawerTheme: ThemeOptions = {
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          '&.menu': {
            display: 'block',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          },
        },
      },
    },
  },
};

export default drawerTheme;
