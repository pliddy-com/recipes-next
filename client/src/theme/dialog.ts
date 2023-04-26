import { ThemeOptions } from '@mui/material/styles';

import baseTheme from 'theme/base';
import { sansFontFamily } from './values/fontface';

const { breakpoints } = baseTheme ?? {};

const dialogThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.loading': {
            alignItems: 'center',
            display: 'flex',
            height: '165px',
            justifyContent: 'center',
            maxHeight: '165px',
            [breakpoints.up('sm')]: {
              maxWidth: '432px',
              width: '432px'
            },
            [breakpoints.down('sm')]: {
              maxWidth: 'calc(100vw - 7rem)'
            }
          }
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
          fontFamily: sansFontFamily
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
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          paddingTop: '3.5px'
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: '-0.25rem'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: sansFontFamily,
          flex: 1
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '0.78125rem 0.875rem 0.53125rem'
        }
      }
    }
  }
};

export default dialogThemeOptions;
