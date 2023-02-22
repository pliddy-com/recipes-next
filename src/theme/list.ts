import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { sansFontFamily } from './fontface';

// TODO: differentiate between nav list and recipe lists
// recipe lists introduce .25rem margin left, not wanted in nav

const listTheme: ThemeOptions = {
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          '&.recipeList': {
            marginBottom: '1rem',
            marginLeft: '.25rem',
            paddingBottom: 0,
            paddingTop: 0,
            '&.orderedList': {
              '& .MuiListItemText-root': {
                marginTop: '4px',
                marginBottom: '0px',
                paddingTop: '4px',
              },
              '& .MuiListItem-root': {
                alignItems: 'flex-start',
              },
            },
          },
          '& .MuiListItem-root': {
            '&.menuItem': {
              paddingLeft: 0,
            },
            '&.menuItem, &.subMenuItem': {
              '& .MuiListItemText-primary': {
                fontFamily: sansFontFamily,
                color: colors.primary.main,
                fontSize: '1rem',
              },
            },
            '& .MuiListItemIcon-root': {
              minWidth: '2.75rem',
            },
            '& .MuiListItemAvatar-root': {
              alignItems: 'center',
              display: 'flex',
              marginRight: '.5rem',
              minWidth: '2.5rem',
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
