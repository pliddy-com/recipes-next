// utility styles

import colors from 'theme/colors';

export const centeredChild = {
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
  content: {
    height: '100vh',
  },
};

export const flex = {
  display: 'flex',
};

export const background = {
  backgroundColor: colors.common.background,
};

export const tagButtons = {
  button: {
    borderRadius: '2rem',
    textTransform: 'capitalize',
    fontWeight: 300,
  },
  tags: {
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': { ml: 0, mb: '.5rem', mr: '.5rem' },
  },
};
