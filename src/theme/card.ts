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
          '& .imageWrapper': {
            height: '100%',
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-start',
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
              marginBottom: '0.5rem',
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
          },
          '&.preview': {
            '& .MuiCardHeader': {
              '&-root': {
                width: '100%',
                paddingBottom: 0,
              },
              '&-title': {
                color: colors.primary.main,
                borderBottom: `1px solid ${colors.secondary.main}`,
                paddingBottom: '.25rem',
              },
            },
            '& .MuiCardContent-root': {
              paddingTop: '1rem',
            },
          },
        },
      },
    },
  },
};

export default cardTheme;
