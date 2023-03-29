import MenuIcon from '@mui/icons-material/Menu';

import NavIconButton from '../NavIconButton/NavIconButton';

interface CategoriesButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const CategoriesButton = ({ onClick, hideLabel }: CategoriesButtonProps) => {
  const ariaLabel = 'open categories menu';
  const className = 'menu-button';
  const label = 'Categories';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<MenuIcon />}
      label={label}
      onClick={onClick}
    />
  );
};

export default CategoriesButton;
