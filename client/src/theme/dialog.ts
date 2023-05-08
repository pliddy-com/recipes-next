import { ThemeOptions } from '@mui/material/styles';

import baseTheme from 'theme/base';
import { sansFontFamily } from './values/fontface';

const { breakpoints } = baseTheme ?? {};

const dialogThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // '&.loading': {
          //   alignItems: 'center',
          //   display: 'flex',
          //   height: '180px',
          //   justifyContent: 'center',
          //   maxHeight: '180px',
          //   [breakpoints.up('sm')]: {
          //     maxWidth: '432px',
          //     width: '432px'
          //   },
          //   [breakpoints.down('sm')]: {
          //     maxWidth: 'calc(100vw - 7rem)'
          //   }
          // }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '&.signInDialog': {
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'center',
            top: '3rem',
            '& .MuiDialogTitle': {
              '&-root': {
                padding: '1rem 1rem .375rem',
                marginBottom: '1rem'
              }
            }
          },
          '& .MuiContainer-root.loading': {
            alignItems: 'center',
            display: 'flex',
            height: '180px',
            justifyContent: 'center',
            maxHeight: '180px',
            minHeight: 'auto',
            [breakpoints.up('sm')]: {
              maxWidth: '432px',
              width: '432px'
            },
            [breakpoints.down('sm')]: {
              maxWidth: 'calc(100vw - 7rem)'
            }
          }
        },
        container: {
          alignItems: 'flex-start',
          width: '100%'
        },
        paper: {
          flexGrow: 1
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          marginBottom: '1rem'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          marginRight: '1rem'
        }
      }
    }
  }
};

export default dialogThemeOptions;
