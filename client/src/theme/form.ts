import { ThemeOptions } from '@mui/material/styles';
import { sansFontFamily } from './values/fontface';

const formThemeOptions: ThemeOptions = {
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          //   '&.number': {
          //     // width: '50%'
          //   },
          '&.multiline': {
            '& .MuiInputBase-root': {
              padding: '0.5rem 0 0.25rem'
            }
          },
          '& .MuiInputAdornment-root': {
            '& .MuiTypography-body1': {
              fontFamily: sansFontFamily
            }
          }
        }
      }
    }
  }
};

export default formThemeOptions;
