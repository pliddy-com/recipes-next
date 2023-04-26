import { ThemeOptions } from '@mui/material/styles';

import { sansFontFamily } from './values/fontface';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.loading': {
            alignItems: 'center',
            display: 'flex',
            height: '165px',
            maxHeight: '165px',
            width: '458px',
            justifyContent: 'center',
            maxWidth: '458px'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '&.signInDialog': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
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
          alignItems: 'flex-start'
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

export default formThemeOptions;
