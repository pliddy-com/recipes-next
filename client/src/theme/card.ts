import { ThemeOptions } from '@mui/material/styles';

import colors from 'theme/colors';
import { fontWeightMedium, sansFontFamily } from './fontface';

import baseTheme from 'theme/base';

const { breakpoints, palette } = baseTheme ?? {};

const cardThemeOptions: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          '& .abstract': {
            marginBottom: '0.5rem'
          },
          '& .imageWrapper': {
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            '& .dynamicImage': {
              width: '100%',
              height: 'auto',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              aspectRatio: '3 / 2'
            }
          },
          '& .MuiCardHeader': {
            '&-root': {
              width: '100%',
              paddingBottom: 0
            },
            '&-title': {
              color: colors.primary.main
            },
            '&-subheader': {
              fontFamily: sansFontFamily,
              fontSize: '0.875rem',
              fontWeight: fontWeightMedium,
              letterSpacing: '.2px',
              marginTop: '0.25rem',
              marginBottom: '0.5rem'
            }
          },
          '& .MuiCardActionArea': {
            '&-root': {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'flex-start'
            }
          },
          '& .MuiCardContent': {
            '&-root': {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'space-between',
              width: '100%'
            }
          },
          '& .MuiCardActions': {
            '&-root': {
              padding: '1rem',
              marginTop: 'auto'
            }
          },
          '&.recipe': {
            '& .MuiCardHeader': {
              '&-content': {
                display: 'flex',
                flexDirection: 'column-reverse',
                '& .MuiCardHeader': {
                  '&-title': {
                    borderTop: `1px solid ${colors.secondary.main}`,
                    borderBottom: 'none',
                    paddingTop: '.25rem'
                  },
                  '&-subheader': {
                    display: 'block',
                    marginBottom: '.25rem'
                  }
                }
              }
            },
            '& .MuiCardContent': {
              '&-root': {
                minHeight: '102px'
              }
            }
          },
          '&.preview': {
            '& .MuiCardActionArea': {
              '&-root': {
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('xs')]: {
                      flexDirection: 'column'
                    }
                  }),
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('sm')]: {
                      flexDirection: 'row'
                    }
                  }),
                ...(breakpoints &&
                  breakpoints.only && {
                    [breakpoints.only('md')]: {
                      flexDirection: 'column'
                    }
                  }),
                ...(breakpoints &&
                  breakpoints.up && {
                    [breakpoints.up('lg')]: {
                      flexDirection: 'column'
                    }
                  }),
                flexDirection: 'column',
                alignItems: 'stretch'
              }
            },
            '& .MuiCardHeader': {
              '&-root': {
                padding: '0 0 .5rem 0'
              },
              '&-title': {
                borderBottom: `1px solid ${palette.secondary.main}`,
                paddingBottom: '.25rem'
              }
            },
            '& .MuiCardContent': {
              '&-root': {
                paddingTop: '1rem',
                justifyContent: 'flex-start'
              }
            }
          }
        }
      }
    }
  }
};

export default cardThemeOptions;
