import Link from 'next/link';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import LogoIcon from '../../../Icons/LogoIcon/LogoIcon';

import config from 'lib/config';

interface LogoButtonProps {
  hideLabel?: boolean;
}

const LogoButton = ({ hideLabel = false }: LogoButtonProps) =>
  hideLabel ? (
    <IconButton
      aria-label="home"
      className="logo"
      color="inherit"
      edge="start"
      href="/"
      role="button"
    >
      <LogoIcon />
    </IconButton>
  ) : (
    <Button
      aria-label="home"
      className="logo"
      color="primary"
      component={Link}
      href="/"
      role="button"
      size="large"
      startIcon={<LogoIcon />}
    >
      {config?.microcopy?.site?.title}
    </Button>
  );

export default LogoButton;
