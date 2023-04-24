import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import NavIconButton from '../NavIconButton/NavIconButton';

import { useAuthContext } from 'contexts/Authentication';

interface SearchButtonProps {
  hideLabel?: boolean;
}

const SignInButton = ({ hideLabel }: SearchButtonProps) => {
  const { isAuth, signOut } = useAuthContext();

  return (
    <NavIconButton
      ariaLabel={isAuth ? 'sign out' : 'sign in'}
      className="menu-button auth"
      hideLabel={hideLabel}
      icon={isAuth ? <LogoutIcon /> : <LoginIcon />}
      label={isAuth ? 'Sign Out' : 'Sign In'}
      onClick={isAuth ? signOut : undefined}
      href={isAuth ? undefined : '/signin'}
    />
  );
};

export default SignInButton;
