import Link from 'next/link';

import Button from '@mui/material/Button';

import LogoIcon from 'assets/LogoIcon';

import { logoButtonStyles } from 'lib/styles';

const LogoButton = () => {
  return (
    <Button
      color="primary"
      component={Link}
      href="/"
      size="large"
      startIcon={<LogoIcon />}
      sx={logoButtonStyles.logo}
    >
      Recipes
    </Button>
  );
};

export default LogoButton;
