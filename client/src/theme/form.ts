import { ThemeOptions } from '@mui/material/styles';
import { fontWeightBold, sansFontFamily } from './values/fontface';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
          marginTop: '0',
          width: '100%',
          '&.multiline': {
            '& .MuiInputBase-inputMultiline': {
              paddingTop: '0.375rem'
            },
            '& .MuiFormLabel-root[data-shrink="false"]': {
              marginTop: '-0.1875rem'
            }
          },
          '& .MuiInputLabel-root[data-shrink="false"]': {
            marginTop: '-0.25rem'
          },
          '&.bold': {
            '& .MuiInputBase-root': {
              fontWeight: fontWeightBold
            }
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          marginTop: '0.125rem'
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: '0.25rem',
          '& .MuiTypography-body1': {
            fontFamily: sansFontFamily
          }
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
          paddingTop: '12px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: sansFontFamily,
          '& .MuiInputLabel-root[data-shrink="false"]': {
            marginTop: '0.125rem'
          }
        }
      }
    }
  }
};

export default formThemeOptions;
