import { ThemeOptions } from '@mui/material/styles';

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
                paddingTop: '4px'
              },
              '& .MuiListItem-root': {
                alignItems: 'flex-start'
              }
            }
          }
        }
      }
    }
  }
};

export default listThemeOptions;
