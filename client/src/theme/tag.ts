import { ThemeOptions } from '@mui/system';
import { sansFontFamily } from './values/fontface';

const tagThemeOptions: ThemeOptions = {
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          '&.tags-buttons': {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '1rem',
            minHeight: '33px'
          },
          '&.tags-edit': {
            '& .MuiTypography-h2': {
              marginBottom: '1rem'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.tag': {
            borderRadius: '2rem',
            textTransform: 'capitalize',
            fontFamily: sansFontFamily,
            fontWeight: 400,
            paddingTop: '0.1875rem',
            paddingBottom: '0.125rem',
            fontSize: '0.875rem',
            marginLeft: 0,
            marginBottom: '.5rem',
            marginRight: '.5rem'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.tag': {
            borderRadius: '2rem',
            textTransform: 'capitalize',
            fontFamily: sansFontFamily,
            fontWeight: 400,
            padding: 0,
            fontSize: '0.875rem',
            height: 'auto',
            lineHeight: '1.125rem',
            marginLeft: 0,
            marginBottom: '.5rem',
            marginRight: '.5rem',
            minWidth: '4rem',
            '& .MuiChip-label': {
              paddingTop: '3px',
              paddingBottom: '2px',
              paddingLeft: '9px',
              paddingRight: '9px'
            }
          }
        }
      }
    }
  }
};

export default tagThemeOptions;
