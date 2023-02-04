import Link from 'next/link';

import Button from '@mui/material/Button';

import LogoIcon from 'icons/LogoIcon';

const LogoButton = () => {
  return (
    <Button
      color="primary"
      component={Link}
      href="/"
      size="large"
      startIcon={<LogoIcon />}
      className="logo"
    >
      Recipes
    </Button>
  );
};

export default LogoButton;
