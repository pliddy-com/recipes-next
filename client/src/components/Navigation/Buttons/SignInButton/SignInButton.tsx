import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import NavIconButton from '../NavIconButton/NavIconButton';

import { useAuthContext } from 'contexts/Authentication';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { MouseEvent, MouseEventHandler } from 'react';

interface SearchButtonProps {
  hideLabel?: boolean;
  style?: 'button' | 'menu';
  onClick?: MouseEventHandler;
}

const SignInButton = ({
  hideLabel = false,
  onClick,
  style = 'button'
}: SearchButtonProps) => {
  const { isAuth, signOut } = useAuthContext();

  const onSignOutClick = (e: MouseEvent) => {
    e.preventDefault();
    signOut();
    onClick && onClick(e);
  };

  return style === 'menu' ? (
    <ListItemButton
      aria-label={isAuth ? 'sign out' : 'sign in'}
      {...(!isAuth ? { href: '/signin' } : {})}
      onClick={isAuth ? onSignOutClick : signOut}
    >
      <ListItemText primary={isAuth ? 'Sign Out' : 'Sign In'} />
      <ListItemIcon>
        {isAuth ? (
          <LogoutIcon fontSize="small" />
        ) : (
          <LoginIcon fontSize="small" />
        )}
      </ListItemIcon>
    </ListItemButton>
  ) : (
    <NavIconButton
      ariaLabel={isAuth ? 'sign out' : 'sign in'}
      className="menu-button auth"
      hideLabel={hideLabel}
      icon={isAuth ? <LogoutIcon /> : <LoginIcon />}
      label={isAuth ? 'Sign Out' : 'Sign In'}
      onClick={isAuth ? onSignOutClick : undefined}
      href={isAuth ? undefined : '/signin'}
    />
  );
};

export default SignInButton;
