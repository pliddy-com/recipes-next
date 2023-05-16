import { ThemeOptions } from '@mui/material/styles';

import baseTheme from 'theme/base';

import { sansFontFamily } from './values/fontface';

const { breakpoints } = baseTheme ?? {};

const pageThemeOptions: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.page': {
            backgroundColor: baseTheme.palette.common.white,
            height: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '3rem',
            paddingTop: '5.25rem',
            '&.auth': {
              paddingTop: '8.125rem'
            },
            '& .MuiGrid': {
              '&-root': {
                display: 'flex'
              }
            },
            '&.tagGrid': {
              overflow: 'auto',
              '& .MuiTypography': {
                '&-h2': {
                  '&.MuiLink': {
                    '&-root': {
                      border: 'none',
                      display: 'flex',
                      lineHeight: 1.125,
                      paddingBottom: '0px',
                      textDecoration: 'none',
                      '& .MuiSvgIcon': {
                        '&-root': {
                          marginTop: '2px'
                        }
                      }
                    }
                  }
                }
              }
            },
            '&.recipeGrid': {
              overflow: 'auto'
            },
            '&.recipe': {
              '& .recipe-header': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                '& .MuiTypography-h1': {
                  flexGrow: 1
                },
                '&.sub': {
                  '& .MuiTypography-h2': {
                    flexGrow: 1
                  }
                }
              },
              '& .content': {
                marginBottom: '3rem',
                [breakpoints.down('sm')]: {
                  flexDirection: 'column-reverse',
                  marginBottom: '2rem'
                },
                [breakpoints.up('sm')]: {
                  flexDirection: 'row',
                  marginBottom: '2rem'
                },
                '& .contentGrid': {
                  width: '100%'
                },
                '& .description': {
                  width: '100%',
                  '& .details': {
                    borderTop: `1px solid ${baseTheme.palette.grey[300]}`,
                    marginTop: '.5rem',
                    paddingTop: '1rem',
                    '& .yield': {
                      justifyContent: 'flex-end'
                    }
                  },
                  '& .MuiTypography': {
                    '&-subtitle2': {
                      fontFamily: sansFontFamily,
                      lineHeight: 1.375,
                      '& strong': {
                        color: baseTheme.palette.primary.main
                      }
                    }
                  }
                },
                '& .image': {
                  marginLeft: 0,
                  marginRight: 0,
                  [breakpoints.up('lg')]: {
                    marginLeft: '2rem',
                    marginTop: 0,
                    marginBottom: 0
                  },
                  [breakpoints.down('lg')]: {
                    marginBottom: 0,
                    marginTop: '2rem'
                  },
                  [breakpoints.down('md')]: {
                    marginTop: '1.5rem',
                    marginBottom: '1rem'
                  },
                  [breakpoints.down('sm')]: {
                    marginTop: 0
                  },
                  '& .dynamicImage': {
                    aspectRatio: '4 /3',
                    height: 'auto',
                    objectFit: 'cover',
                    width: '100%'
                  }
                },
                '& .tags': {
                  marginTop: 'auto',
                  marginBottom: '1rem',
                  '& .tagButtons': {
                    marginTop: '2rem',
                    marginBottom: '-1rem'
                  }
                }
              },
              '& .equipment': {
                '& .icon': {
                  width: '1.5rem',
                  height: '1.5rem'
                }
              },
              '& .listEdit': {
                '& .MuiTypography': {
                  '&-h2': {
                    marginBottom: '1.5rem'
                  }
                },
                justifyItems: 'flex-start',
                '& .icon': {
                  width: '1.5rem',
                  height: '1.5rem'
                },
                '& .MuiBox-root': {
                  '&.section': {
                    marginLeft: '1rem',
                    marginRight: '1rem'
                  }
                },
                '& .MuiFormControl-root': {
                  marginLeft: 0,
                  marginRight: 0
                },
                '& .MuiButton-root': {
                  alignSelf: 'flex-start'
                }
              },
              '& .sectionEdit': {
                '& .MuiTypography': {
                  '&-h2': {
                    marginBottom: '1.5rem'
                  }
                },
                '& .edit-section': {
                  marginBottom: '3rem'
                }
              }
            },
            '&.search': {
              '& .MuiPaper': {
                '&-root': {
                  '&.search': {
                    alignItems: 'center',
                    display: 'flex',
                    padding: '2px 4px'
                  }
                }
              }
            },
            '& .recipe-edit': {
              marginTop: '0.5rem',
              '& .edit-section': {
                marginBottom: '1rem'
              }
            }
          },
          '&.loading': {
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            height: '75vh',
            justifyContent: 'center',
            minHeight: '75vh'
          }
        }
      }
    }
  }
};

export default pageThemeOptions;
