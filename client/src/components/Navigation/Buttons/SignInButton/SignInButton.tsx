import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';

import NavIconButton from '../NavIconButton/NavIconButton';

import { useAuthContext } from 'contexts/Authentication';
import { MouseEventHandler, useEffect, useState } from 'react';
import SignInDialog from 'components/SignInDialog/SignInDialog';

interface SearchButtonProps {
  hideLabel?: boolean;
  style?: 'button' | 'menu';
  onClick?: MouseEventHandler;
}

const SignInButton = ({ hideLabel = false }: SearchButtonProps) => {
  const { isAuth, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth) {
      setIsOpen(false);
    }
  }, [isAuth]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  /* istanbul ignore next */
  const onClose = () => {
    console.log('onClose');
    setIsOpen(false);
  };

  /* istanbul ignore next */
  const onSignOutClick = () => {
    console.log('onSignOutClick');
    signOut();
  };

  return (
    <>
      <NavIconButton
        ariaLabel={isAuth ? 'sign out' : 'sign in'}
        className="menu-button auth"
        hideLabel={hideLabel}
        icon={isAuth ? <LockIcon /> : <LoginIcon />}
        label={isAuth ? 'Sign Out' : 'Sign In'}
        onClick={isAuth ? onSignOutClick : handleClick}
      />
      <SignInDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SignInButton;
