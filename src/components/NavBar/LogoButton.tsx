import Link from 'next/link';

import Button from '@mui/material/Button';

import LogoIcon from 'assets/LogoIcon';

import colors from 'theme/colors';

const styles = {
  logo: {
    color: colors.common.white,
    display: 'flex',
    marginRight: 'auto',
    textTransform: 'capitalize',
  },
};

const LogoButton = () => {
  return (
    <Button
      color="primary"
      component={Link}
      href="/"
      size="large"
      startIcon={<LogoIcon />}
      sx={styles.logo}
    >
      Recipes
    </Button>
  );
};

export default LogoButton;
