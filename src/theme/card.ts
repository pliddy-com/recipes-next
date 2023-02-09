import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';

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
              color: colors.common.white,
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '.2px',
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
              marginBottom: '2rem',
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
