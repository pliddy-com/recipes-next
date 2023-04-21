/* istanbul ignore file */

import { useState, useContext, useEffect } from 'react';
import NavIconButton from '../NavIconButton/NavIconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthenticationContext } from 'contexts/Authentication';

interface SearchButtonProps {
  hideLabel?: boolean;
}

const SignInButton = ({ hideLabel }: SearchButtonProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const { getSession, signOut } = useContext(AuthenticationContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log('Session: ', err);
        setIsAuth(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <NavIconButton
      ariaLabel={isAuth ? 'sign out' : 'sign in'}
      className="menu-button"
      hideLabel={hideLabel}
      icon={isAuth ? <LogoutIcon /> : <LoginIcon />}
      label={isAuth ? 'Sign Out' : 'Sign In'}
      onClick={isAuth ? signOut : undefined}
      href={isAuth ? undefined : '/signin'}
    />
  );
};

export default SignInButton;
