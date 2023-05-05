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
              marginTop: '-0.125rem'
            }
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
          flex: 1,
          paddingTop: '0.75rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: '12px'
        }
      }
    }
  }
};

export default formThemeOptions;
