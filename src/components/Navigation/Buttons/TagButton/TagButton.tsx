import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TagIcon from '@mui/icons-material/Tag';

interface MenuButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const CuisineButton = ({ onClick, hideLabel = false }: MenuButtonProps) =>
  hideLabel ? (
    <IconButton
      aria-label="open tags menu"
      className="menu"
      color="inherit"
      edge="start"
      onClick={onClick}
      role="button"
    >
      <TagIcon />
    </IconButton>
  ) : (
    <Button
      aria-label="open tags menu"
      className="menu"
      color="primary"
      onClick={onClick}
      role="button"
      size="large"
      startIcon={<TagIcon />}
    >
      Tags
    </Button>
  );

export default CuisineButton;
