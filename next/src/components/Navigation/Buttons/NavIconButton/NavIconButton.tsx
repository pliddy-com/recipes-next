import Link from 'next/link';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { ReactNode } from 'react';

interface NavIconButtonProps {
  ariaLabel: string;
  className: string;
  hideLabel?: boolean;
  href?: string;
  icon: ReactNode;
  label?: string;
  onClick?: VoidFunction;
}

const NavIconButton = ({
  ariaLabel,
  className,
  label,
  onClick,
  hideLabel = false,
  href,
  icon
}: NavIconButtonProps) =>
  !hideLabel ? (
    <Button
      aria-label={ariaLabel}
      className={className}
      color="primary"
      onClick={onClick}
      {...(href ? { href } : {})}
      {...(href ? { component: Link } : {})}
      role="button"
      size="large"
      startIcon={icon}
    >
      {label}
    </Button>
  ) : (
    <IconButton
      aria-label={ariaLabel}
      className={className}
      color="inherit"
      edge="start"
      onClick={onClick}
      role="button"
      {...(href ? { href } : {})}
    >
      {icon}
    </IconButton>
  );

export default NavIconButton;
