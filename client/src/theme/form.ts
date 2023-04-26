import { ThemeOptions } from '@mui/material/styles';

import { sansFontFamily } from './values/fontface';

// import baseTheme from './base';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.signInLoading': {
            background: 'red'
            // background: baseTheme.palette.common.white,
            // border: `1px solid ${baseTheme.palette.grey[400]}`,
            // marginTop: '1.5rem',
            // maxHeight: '248px'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '&.signInDialog': {
            '& .MuiDialogTitle': {
              '&-root': {
                padding: '1rem 1rem .375rem',
                marginBottom: '1rem'
              }
            }
          }
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
          fontFamily: sansFontFamily
          // paddingTop: '3.5px'
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          // marginRight: '-0.25rem'
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
          // padding: '0.78125rem 0.875rem 0.53125rem'
        }
      }
    }
  }
};

export default formThemeOptions;
