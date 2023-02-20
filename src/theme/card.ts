import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { sansFontFamily } from './fontface';

const cardTheme: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          },
          '& .MuiCardHeader': {
            '&-root': {
              backgroundColor: colors.primary.main,
              color: '#fff',
              display: 'flex',
              width: '100%',
            },
            '&-content': {
              display: 'flex',
              flexDirection: 'column-reverse',
            },
            '&-subheader': {
              color: colors.secondary.highlight,
              fontFamily: sansFontFamily,
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '.2px',
              marginTop: '0.25rem',
            },
            '&-title': {
              fontSize: '1.25rem',
            },
          },
          '& .MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            width: '100%',
          },
          '& .MuiCardActions-root': {
            padding: '1rem',
            marginTop: 'auto',
          },
          '&.recipe': {
            '& .abstract': {
              marginBottom: '1rem',
            },
            '& .imageWrapper': {
              height: '100%',
              position: 'relative',
              width: '100%',
            },
          },
        },
      },
    },
  },
};

export default cardTheme;
