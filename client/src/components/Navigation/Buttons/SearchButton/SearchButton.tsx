import NavIconButton from '../NavIconButton/NavIconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps {
  hideLabel?: boolean;
}

const SearchButton = ({ hideLabel }: SearchButtonProps) => {
  const ariaLabel = 'search';
  const className = 'menu';
  const label = 'Search';
  const href = '/search';

  return (
    <NavIconButton
      ariaLabel={ariaLabel}
      className={className}
      hideLabel={hideLabel}
      icon={<SearchIcon />}
      label={label}
      href={href}
    />
  );
};

export default SearchButton;
