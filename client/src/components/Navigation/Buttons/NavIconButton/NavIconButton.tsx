import Link from 'next/link';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { MouseEventHandler } from 'react';

interface NavIconButtonProps {
  ariaLabel: string;
  className: string;
  hideLabel?: boolean;
  id?: string;
  isMenu?: boolean;
  href?: string;
  icon: JSX.Element;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const NavIconButton = ({
  ariaLabel,
  className,
  disabled = false,
  isMenu = false,
  label,
  onClick,
  hideLabel = false,
  href,
  icon,
  id
}: NavIconButtonProps) =>
  !hideLabel ? (
    <Button
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      color="primary"
      id={id}
      onClick={onClick}
      {...(href ? { href } : {})}
      {...(href ? { component: Link } : {})}
      role="button"
      size="large"
      startIcon={icon}
    >
      {label}
      {isMenu && <span className="dropdown-icon">▼</span>}
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
