import { ThemeOptions } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

import colors from './colors';

const breakpoints = createBreakpoints({});

const containerTheme: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.page': {
            backgroundColor: colors.common.white,
            minHeight: '100vh',
            paddingBottom: '3rem',
            paddingTop: '5rem',
            [breakpoints.up('md')]: {
              paddingTop: '6rem',
            },
          },
        },
      },
    },
  },
};

export default containerTheme;
