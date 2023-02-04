import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { sansFontFamily } from './type';

// TODO: differentiate between nav list and recipe lists
// recipe lists introduce .25rem margin left, not wanted in nav

const listTheme: ThemeOptions = {
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          '&.recipeList': {
            marginLeft: '.25rem',
          },
          '& .MuiListItem-root': {
            '&.subMenuItem': {
              '& .MuiListItemText-root': {
                '& .MuiListItemText-primary': {
                  fontFamily: sansFontFamily,
                },
              },
            },
            '& .MuiListItemIcon-root': {
              alignItems: 'center',
              marginRight: '.5rem',
              height: '1.5rem',
              width: '1.5rem',
              minWidth: 0,
              '& .MuiSvgIcon-root': {
                height: '1.5rem',
                width: '1.5rem',
              },
            },
            '& .MuiListItemAvatar-root': {
              alignItems: 'center',
              display: 'flex',
              marginRight: '.5rem',
              minWidth: 0,
              '& .MuiAvatar-root': {
                backgroundColor: colors.primary.main,
                fontFamily: sansFontFamily,
                fontSize: '.8rem',
                fontWeight: '600',
                height: '1.5rem',
                letterSpacing: '.5px',
                paddingTop: `${1 / 16}rem`,
                width: '1.5rem',
              },
            },

            '&.menuItem': {
              paddingLeft: 0,
              '& .MuiListItemText-primary': {
                fontFamily: sansFontFamily,
              },
            },
          },
        },
      },
    },
  },
};

export default listTheme;
