import { ThemeOptions } from '@mui/material/styles';

import colors from './colors';

import baseTheme from 'theme/base';

const { breakpoints } = baseTheme ?? {};

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
            '&.tagGrid': {
              '& .MuiTypography-h2': {
                border: 'none',
                marginBottom: '.5rem',
              },
            },
            '&.recipe': {
              '& .content': {
                marginBottom: '2rem',
                '& .description': {
                  marginBottom: '1rem',
                },
                '& .tags': {
                  marginTop: 'auto',
                  '& .tagButtons': {
                    marginTop: '2rem',
                    marginBottom: '-1rem',
                  },
                },
              },
              '& .image': {
                marginLeft: 0,
                marginRight: 0,
                marginTop: '2rem',
                ...(breakpoints &&
                  breakpoints.up && {
                    [breakpoints.up('lg')]: {
                      marginLeft: '2rem',
                      marginTop: 0,
                    },
                  }),
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
