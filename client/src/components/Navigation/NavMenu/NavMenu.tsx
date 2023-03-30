import { MouseEventHandler } from 'react';

import Menu from '@mui/material/Menu';

import { TaxonomyChildrenItem } from 'types/queries';
import NavMenuList from 'components/Navigation//NavMenuList/NavMenuList';

export interface NavMenuProps {
  anchorEl: null | HTMLElement;
  featuredLabel?: string;
  featuredUrl?: string;
  id: string;
  isOpen: boolean;
  label: string;
  onClick: MouseEventHandler;
  onClose: VoidFunction;
  nav: TaxonomyChildrenItem[];
  root: string;
}

const NavMenu = ({
  anchorEl,
  featuredLabel,
  featuredUrl,
  id,
  isOpen,
  label,
  nav,
  onClick,
  onClose,
  root
}: NavMenuProps) => {
  return (
    <Menu
      elevation={0}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 46,
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={onClose}
      open={isOpen}
      className="dropdown-menu"
    >
      <NavMenuList
        className="menuList"
        featuredLabel={featuredLabel}
        featuredUrl={featuredUrl}
        id={id}
        label={label}
        nav={nav}
        onClick={onClick}
        root={root}
      />
    </Menu>
  );
};

export default NavMenu;
