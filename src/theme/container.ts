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
            [breakpoints.down('md')]: {
              backgroundColor: colors.common.background,
            },
            backgroundColor: colors.common.white,
            paddingTop: '5rem',
            paddingBottom: '3rem',
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
