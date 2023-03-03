import { ThemeOptions } from '@mui/material/styles';
import colors from 'theme/colors';
import { fontWeightBold, sansFontFamily } from './fontface';

// TODO: differentiate between nav list and recipe lists
// recipe lists introduce .25rem margin left, not wanted in nav

const listThemeOptions: ThemeOptions = {
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
          '& .MuiListSubheader-root': {
            backgroundColor: colors.primary.main,
            color: colors.common.white,
            fontFamily: sansFontFamily,
            fontSize: '1rem',
            fontWeight: fontWeightBold,
            minHeight: '4rem',
            paddingTop: '.5rem',
            textTransform: 'capitalize',
          },
          '& .MuiListItem-root': {
            '&.menuItem': {
              paddingLeft: 0,
              '&.featured': {
                '& .MuiListItemText-primary': {
                  fontWeight: fontWeightBold,
                },
              },
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

export default listThemeOptions;
