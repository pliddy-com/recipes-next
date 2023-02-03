import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { menuButtonStyles } from 'lib/styles';

interface MenuButtonProps {
  onClick: VoidFunction;
}

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <IconButton
      aria-label="open drawer"
      color="inherit"
      edge="start"
      onClick={onClick}
      sx={menuButtonStyles.menuIcon}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
