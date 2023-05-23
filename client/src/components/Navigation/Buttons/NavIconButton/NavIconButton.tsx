import Link from 'next/link';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { MouseEventHandler } from 'react';

interface NavIconButtonProps {
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  href?: string;
  icon: JSX.Element;
  id?: string;
  isMenu?: boolean;
  isOpen?: boolean;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'text' | 'outlined' | 'contained';
}

const NavIconButton = ({
  ariaLabel,
  className,
  disabled = false,
  hideLabel = false,
  href,
  icon,
  id,
  isMenu = false,
  isOpen = false,
  label,
  onClick,
  variant
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
      variant={variant}
    >
      {label}
      {isMenu && <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>}
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
