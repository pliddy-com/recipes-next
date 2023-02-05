import Link from 'next/link';

import Button from '@mui/material/Button';

import LogoIcon from 'icons/LogoIcon';
import { microcopy } from 'lib/config';

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
      {microcopy.site.title}
    </Button>
  );
};

export default LogoButton;
