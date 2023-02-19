import Link from 'next/link';

import Button from '@mui/material/Button';

import LogoIcon from '../LogoIcon/LogoIcon';
import config from 'lib/config';

const LogoButton = () => (
  <Button
    aria-label="home"
    role="button"
    color="primary"
    component={Link}
    href="/"
    size="large"
    startIcon={<LogoIcon />}
    className="logo"
  >
    {config?.microcopy?.site?.title}
  </Button>
);

export default LogoButton;
