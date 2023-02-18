import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { serifFontFamily, sansFontFamily } from './type';

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
            '&.menuItem': {
              paddingLeft: 0,
              '& .MuiListItemText-primary': {
                fontFamily: serifFontFamily,
                color: colors.primary.main,
              },
            },
            '&.subMenuItem': {
              '& .MuiListItemText-root': {
                '& .MuiListItemText-primary': {
                  fontFamily: serifFontFamily,
                  color: colors.primary.main,
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
                fontSize: '13px',
                fontWeight: 900,
                height: '24px',
                letterSpacing: '-.5px',
                // paddingBottom: '1px',
                paddingRight: '1px',
                width: '24px',
              },
            },
          },
        },
      },
    },
  },
};

export default listTheme;
