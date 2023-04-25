import { ThemeOptions } from '@mui/material/styles';

import { sansFontFamily } from './values/fontface';

import baseTheme from './base';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.signInLoading': {
            border: `1px solid ${baseTheme.palette.grey[400]}`,
            marginTop: '1.25rem',
            maxHeight: '248px'
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '1rem',
          width: '100%',
          '&.signin': {
            border: `1px solid ${baseTheme.palette.grey[400]}`,
            padding: '1rem 2rem 2rem'
          }
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
