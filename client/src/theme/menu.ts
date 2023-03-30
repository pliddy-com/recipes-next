import { ThemeOptions } from '@mui/material/styles';

import colors from './colors';
import theme from './base';
import { fontWeightBold, sansFontFamily } from './fontface';

const menuThemeOptions: ThemeOptions = {
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiList-root': {
            padding: 0,
            '&.menuList': {
              padding: 0
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.menuItem': {
            padding: 0,
            '&.featured': {
              '& .MuiListItemText-primary': {
                fontWeight: fontWeightBold
              }
            }
          },
          '&.subMenuItem': {},
          '&.menuItem, &.subMenuItem': {
            paddingTop: 0,
            paddingBottom: 0,
            '& .MuiListItemText-primary': {
              color: colors.primary.main,
              fontFamily: sansFontFamily,
              minWidth: '11rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&.menuList': {
            padding: 0
          }
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
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
            letterSpacing: '-.5px'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2.75rem'
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '&.dropdown-menu': {
            '& .MuiMenu-paper': {
              border: `1px solid ${colors.primary.main}`,
              borderRadius: 0,
              maxHeight: `calc(100vh - 2 * ${theme.mixins.toolbar.minHeight})`
            }
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '&.menu-drawer': {
            '& .menuList': {
              padding: 0,
              '& .menuItem': {
                '&.featured': {
                  maxHeight: `calc(${theme.mixins.toolbar.minHeight})`
                }
              }
            },
            '& .MuiListSubheader-root': {
              backgroundColor: colors.primary.main,
              color: colors.common.white,
              fontFamily: sansFontFamily,
              fontSize: '1rem',
              fontWeight: fontWeightBold,
              minHeight: theme.mixins.toolbar.minHeight,
              paddingTop: '.25rem',
              textTransform: 'capitalize'
            }
          }
        }
      }
    }
  }
};

export default menuThemeOptions;
