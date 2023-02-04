// custom component style for unique layout requirements, could be shareable
// as full screen centered utility class

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

// type of IconButton, add as className to theme

export const menuButtonStyles = {
  menuIcon: { ml: 'auto' },
};

// type of ListItem, add as className to theme

export const categoryMenuStyles = {
  menuItem: {
    paddingLeft: 0,
  },
};

// type of Drawer, add as className to theme

export const navMenuStyles = {
  menuDrawer: {
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: 240,
    },
  },
};

// custom component style for unique layout requirements, could be shareable

export const recipeStyles = {
  pageImageWrapper: {
    marginBottom: '1rem',
  },
};

// type of Card, add as className to theme

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

// type of Grid, add as className to theme (as 'flex')

export const recipeGridStyles = {
  recipeGridItem: {
    display: 'flex',
  },
};
