import { ThemeOptions } from '@mui/material/styles';

import colors from 'theme/colors';
import { fontWeightRegular, sansFontFamily } from './fontface';

import baseTheme from 'theme/base';

const { breakpoints, palette } = baseTheme ?? {};

const cardThemeOptions: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '& .abstract': {
            marginBottom: '0.5rem',
          },
          '& .imageWrapper': {
            height: '100%',
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          '& .MuiCardHeader': {
            '&-root': {
              width: '100%',
              paddingBottom: 0,
            },
            '&-title': {
              color: colors.primary.main,
              borderBottom: `1px solid ${palette.secondary.main}`,
              paddingBottom: '.25rem',
            },
            '&-subheader': {
              color: palette.primary.main,
              fontFamily: sansFontFamily,
              fontSize: '0.875rem',
              fontWeight: fontWeightRegular,
              letterSpacing: '.2px',
              marginTop: '0.25rem',
              marginBottom: '0.5rem',
            },
          },
          '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-start',
          },
          '& .MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            width: '100%',
          },
          '& .MuiCardActions-root': {
            padding: '1rem',
            marginTop: 'auto',
          },
          '&.recipe': {
            '& .imageWrapper': {
              paddingLeft: '1rem',
              paddingRight: '1rem',
            },

            // '& .MuiCardHeader': {
            //   '&-subheader': {
            //     fontFamily: sansFontFamily,
            //     fontSize: '0.875rem',
            //     fontWeight: 500,
            //     letterSpacing: '.2px',
            //     marginTop: '0.25rem',
            //     marginBottom: '0.5rem',
            //   },
            // },
          },
          '&.preview': {
            '& .MuiCardActionArea-root': {
              '& .stack': {
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('xs')]: {
                      flexDirection: 'column',
                    },
                  }),
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('sm')]: {
                      flexDirection: 'row',
                    },
                  }),
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('md')]: {
                      flexDirection: 'column',
                    },
                  }),
                ...(breakpoints &&
                  breakpoints.up && {
                    [breakpoints.up('lg')]: {
                      flexDirection: 'column',
                    },
                  }),
                flexDirection: 'column',
                alignItems: 'stretch',
              },
            },
            '& .MuiCardMedia-root': {
              display: 'flex',
              flex: 1,
            },
            '& .contentWrapper': {
              flex: 1,
            },
            '& .MuiCardContent-root': {
              paddingTop: '1rem',
            },
          },
        },
      },
    },
  },
};

export default cardThemeOptions;
