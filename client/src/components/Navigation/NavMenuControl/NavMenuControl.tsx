import { useState } from 'react';

import NavIconButton from 'components/Navigation/Buttons/NavIconButton/NavIconButton';
import NavMenu from 'components/Navigation/NavMenu/NavMenu';

import { TaxonomyChildrenItem } from 'types/queries';

export interface NavMenuControlProps {
  ariaLabel: string;
  featuredLabel?: string;
  featuredUrl?: string;
  icon: JSX.Element;
  id: string;
  label: string;
  nav: TaxonomyChildrenItem[];
  root: string;
}

const NavMenuControl = ({
  ariaLabel,
  featuredLabel,
  featuredUrl,
  icon,
  id,
  label,
  nav,
  root
}: NavMenuControlProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const onClose = () => handleToggle();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleToggle();
  };

  return (
    nav && (
      <>
        {/* Menu Button */}

        <NavIconButton
          ariaLabel={ariaLabel}
          aria-controls={isOpen ? '{id}-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          className="menu-button"
          hideLabel={false}
          icon={icon}
          isMenu={true}
          label={label}
          onClick={onClick}
        />

        {/* Menu List Drawer */}

        <NavMenu
          anchorEl={anchorEl}
          featuredLabel={featuredLabel}
          featuredUrl={featuredUrl}
          id={id}
          isOpen={isOpen}
          label={label}
          onClick={onClick}
          onClose={onClose}
          nav={nav}
          root={root}
        />
      </>
    )
  );
};

export default NavMenuControl;
