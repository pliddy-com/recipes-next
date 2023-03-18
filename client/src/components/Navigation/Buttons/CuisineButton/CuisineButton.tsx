import LanguageIcon from '@mui/icons-material/Language';

import NavIconButton from '../NavIconButton/NavIconButton';

interface CuisineButtonProps {
  onClick: VoidFunction;
  hideLabel?: boolean;
}

const CuisineButton = ({ onClick, hideLabel }: CuisineButtonProps) => {
  const ariaLabel = 'open cuisine menu';
  const className = 'menu';
  const label = 'Cuisine';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<LanguageIcon />}
      label={label}
      onClick={onClick}
    />
  );
};

export default CuisineButton;
