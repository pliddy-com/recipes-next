import colors from 'theme/colors';

// custom component style

export const loadingStyles = {
  loader: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
  loaderContainer: {
    height: '100vh',
  },
};

export const logoButtonStyles = {
  logo: {
    color: colors.common.white,
    display: 'flex',
    marginRight: 'auto',
    textTransform: 'capitalize',
  },
};

export const menuButtonStyles = {
  menuIcon: { ml: 'auto' },
};

export const categoryMenuStyles = {
  menuItem: {
    paddingLeft: 0,
  },
};

export const navMenuStyles = {
  menuDrawer: {
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: 240,
    },
  },
};

export const recipeStyles = {
  pageImageWrapper: {
    marginBottom: '1rem',
  },
};

export const recipeCardStyles = {
  cardAbstract: {
    mb: '2rem',
  },
  cardImageWrapper: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
};

export const recipeGridStyles = {
  recipeGridItem: {
    display: 'flex',
  },
};
