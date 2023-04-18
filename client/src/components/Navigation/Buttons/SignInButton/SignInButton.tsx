import NavIconButton from '../NavIconButton/NavIconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface SearchButtonProps {
  hideLabel?: boolean;
}

const SignInButton = ({ hideLabel }: SearchButtonProps) => {
  const ariaLabel = 'sign in';
  const className = 'menu-button';
  const label = 'Sign In';
  const href = '/signin';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<AccountCircleIcon />}
      label={label}
      href={href}
    />
  );
};

export default SignInButton;
