import { useEffect, useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';

import NavIconButton from 'components/Navigation/Buttons/NavIconButton/NavIconButton';
import SignInDialog from 'components/SignIn/SignInDialog/SignInDialog';

import { useAuthContext } from 'contexts/Authentication';

interface ISignInControl {
  hideLabel?: boolean;
}

const SignInControl = ({ hideLabel = false }: ISignInControl) => {
  const { isAuth, authLoading, signIn, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth) setIsOpen(false);
  }, [isAuth]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavIconButton
        ariaLabel={isAuth ? 'sign out' : 'sign in'}
        className="menu-button auth"
        hideLabel={hideLabel}
        icon={isAuth ? <LockIcon /> : <LoginIcon />}
        label={isAuth ? 'Sign Out' : 'Sign In'}
        onClick={isAuth ? signOut : handleClick}
      />
      {isOpen && (
        <SignInDialog
          isLoading={authLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSignIn={signIn}
        />
      )}
    </>
  );
};

export default SignInControl;
