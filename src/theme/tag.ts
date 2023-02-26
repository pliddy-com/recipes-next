import { ThemeOptions } from '@mui/system';
import { sansFontFamily } from './fontface';

const tagTheme: ThemeOptions = {
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          '&.tagButtons': {
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.tag': {
            borderRadius: '2rem',
            textTransform: 'capitalize',
            fontFamily: sansFontFamily,
            fontWeight: 400,
            paddingTop: '0.1875',
            paddingBottom: '0.125rem',
            fontSize: '0.875rem',
            marginLeft: 0,
            marginBottom: '.5rem',
            marginRight: '.5rem',
          },
        },
      },
    },
  },
};

export default tagTheme;
