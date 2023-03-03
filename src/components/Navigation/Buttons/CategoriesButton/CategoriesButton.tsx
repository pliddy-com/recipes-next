import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

interface MenuButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const MenuButton = ({ onClick, hideLabel = false }: MenuButtonProps) =>
  hideLabel ? (
    <IconButton
      aria-label="open categories menu"
      className="menu"
      color="inherit"
      edge="start"
      onClick={onClick}
      role="button"
    >
      <MenuIcon />
    </IconButton>
  ) : (
    <Button
      aria-label="open categories menu"
      className="menu"
      color="primary"
      onClick={onClick}
      role="button"
      size="large"
      startIcon={<MenuIcon />}
    >
      Categories
    </Button>
  );

export default MenuButton;
