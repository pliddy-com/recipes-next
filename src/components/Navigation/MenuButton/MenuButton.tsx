import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface MenuButtonProps {
  onClick: VoidFunction;
}

const MenuButton = ({ onClick }: MenuButtonProps) => (
  <IconButton
    aria-label="open drawer"
    color="inherit"
    edge="start"
    onClick={onClick}
    className="menu"
  >
    <MenuIcon />
  </IconButton>
);

export default MenuButton;
