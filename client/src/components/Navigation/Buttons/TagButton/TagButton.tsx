import TagIcon from '@mui/icons-material/Tag';

import NavIconButton from '../NavIconButton/NavIconButton';

interface TagButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const CuisineButton = ({ onClick, hideLabel }: TagButtonProps) => {
  const ariaLabel = 'open tags menu';
  const className = 'menu-button';
  const label = 'Tags';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<TagIcon />}
      label={label}
      onClick={onClick}
    />
  );
};

export default CuisineButton;
