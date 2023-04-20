import { ThemeOptions } from '@mui/material/styles';

import { sansFontFamily } from './values/fontface';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          marginTop: '1rem'
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
