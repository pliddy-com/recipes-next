import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';

interface MenuButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const CuisineButton = ({ onClick, hideLabel = false }: MenuButtonProps) =>
  hideLabel ? (
    <IconButton
      aria-label="open cuisine menu"
      className="menu"
      color="inherit"
      edge="start"
      onClick={onClick}
      role="button"
    >
      <LanguageIcon />
    </IconButton>
  ) : (
    <Button
      aria-label="open cuisine menu"
      className="menu"
      color="primary"
      onClick={onClick}
      role="button"
      size="large"
      startIcon={<LanguageIcon />}
    >
      Cuisine
    </Button>
  );

export default CuisineButton;
