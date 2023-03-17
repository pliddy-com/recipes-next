import NavIconButton from '../NavIconButton/NavIconButton';
import LogoIcon from '../../../Icons/LogoIcon/LogoIcon';

import config from 'lib/config';

interface LogoButtonProps {
  hideLabel?: boolean;
}

const LogoButton = ({ hideLabel }: LogoButtonProps) => {
  const ariaLabel = 'home';
  const className = 'logo';
  const label = config?.microcopy?.site?.title;
  const href = '/';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<LogoIcon />}
      label={label}
      href={href}
    />
  );
};

export default LogoButton;
