import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { serifFontFamily, sansFontFamily } from './fontface';

// TODO: differentiate between nav list and recipe lists
// recipe lists introduce .25rem margin left, not wanted in nav

const listTheme: ThemeOptions = {
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          '&.recipeList': {
            marginLeft: '.25rem',
            '&.orderedList': {
              paddingTop: '1rem',
              '& .MuiListItem-root': {
                alignItems: 'flex-start',
              },
            },
            '& .MuiListItemText-root': {
              marginTop: '4px',
              marginBottom: '0px',
              paddingTop: '4px',
            },
          },
          '& .MuiListItem-root': {
            '&.menuItem': {
              paddingLeft: 0,
              '& .MuiListItemText-primary': {
                fontFamily: serifFontFamily,
                color: colors.primary.main,
                fontSize: '1.25rem',
              },
            },
            '&.subMenuItem': {
              '& .MuiListItemText-root': {
                '& .MuiListItemText-primary': {
                  fontFamily: serifFontFamily,
                  color: colors.primary.main,
                  fontSize: '1.25rem',
                },
              },
            },
            '& .MuiListItemAvatar-root': {
              alignItems: 'center',
              display: 'flex',
              marginRight: '.5rem',
              minWidth: 0,
              '& .MuiAvatar-root': {
                color: colors.primary.main,
                backgroundColor: colors.common.white,
                fontFamily: sansFontFamily,
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '-.5px',
              },
            },
          },
        },
      },
    },
  },
};

export default listTheme;
