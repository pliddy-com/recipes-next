import { ThemeOptions } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

import colors from './colors';

const breakpoints = createBreakpoints({});

const containerThemeOptions: ThemeOptions = {
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
            '& .MuiGrid-root': {
              display: 'flex',
            },
            '& .tagGrid': {
              '& .MuiTypography-h2': {
                border: 'none',
                marginBottom: '.5rem',
              },
            },
          },
          '&.loading': {
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
          },
        },
      },
    },
  },
};

export default containerThemeOptions;
