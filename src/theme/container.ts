import { ThemeOptions } from '@mui/material/styles';

import colors from './colors';

import baseTheme from 'theme/base';
import { sansFontFamily } from './fontface';

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
                '&.MuiLink-root': {
                  border: 'none',
                  display: 'flex',
                  lineHeight: 1.125,
                  paddingBottom: '0px',
                  textDecoration: 'none',
                  '& .MuiSvgIcon-root': {
                    marginTop: '2px',
                  },
                },
              },
            },
            '&.recipe': {
              '& .content': {
                marginBottom: '3rem',
                '& .description': {
                  marginBottom: '0.5rem',
                  '& .details': {
                    borderTop: `1px solid ${baseTheme.palette.grey[300]}`,
                    marginTop: '.5rem',
                    paddingTop: '1.5rem',
                    '& .yield': {
                      justifyContent: 'flex-end',
                    },
                  },
                  '& .MuiTypography-subtitle2': {
                    fontFamily: sansFontFamily,
                    lineHeight: 1.375,
                    '& strong': {
                      color: baseTheme.palette.primary.main,
                    },
                  },
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
