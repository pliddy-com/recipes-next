import { useState } from 'react';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import NavIconButton from '../Buttons/NavIconButton/NavIconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavMenuList from '../NavMenuList/NavMenuList';

import { TaxonomyChildrenItem } from 'types/queries';
import ListItemIcon from '@mui/material/ListItemIcon';

export interface NavDataProps {
  categories: TaxonomyChildrenItem[];
  cuisine: TaxonomyChildrenItem[];
  tags: TaxonomyChildrenItem[];
}

export interface MobileNavProps {
  ariaLabel: string;
  nav: NavDataProps;
}
const MobileNav = ({ ariaLabel, nav }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const onClick = () => handleToggle();
  const onClose = () => handleToggle();

  return (
    <>
      {/* Menu Button */}

      <NavIconButton
        ariaLabel={ariaLabel}
        className="menu-button"
        hideLabel={true}
        icon={<MenuIcon />}
        label="Menu"
        onClick={onClick}
      />

      {/* Menu List Drawer */}

      <Drawer
        anchor="right"
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        onClose={onClose}
        open={isOpen}
        className="menu-drawer"
        variant="temporary"
        data-testid="mobile-nav"
      >
        <MenuList className="menuList">
          <MenuItem className="menuItem featured">
            <ListItemButton component={Link} href="/signin" onClick={onClick}>
              <ListItemText primary="Sign In" />
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          </MenuItem>
          <MenuItem className="menuItem featured">
            <ListItemButton component={Link} href="/search" onClick={onClick}>
              <ListItemText primary="Search" />
              <ListItemIcon>
                <SearchIcon fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          </MenuItem>
        </MenuList>

        <NavMenuList
          className="menuList"
          featuredLabel="All Recipes"
          featuredUrl="/"
          id="categories"
          label="Categories"
          nav={nav.categories}
          onClick={onClick}
          root="tags"
          showLabel={true}
        />

        <NavMenuList
          className="menuList"
          id="cuisine"
          label="Cuisine"
          nav={nav.cuisine}
          onClick={onClick}
          root="tags"
          showLabel={true}
        />

        <NavMenuList
          className="menuList"
          featuredLabel="All Tags"
          featuredUrl="/tags"
          id="tags"
          label="Tags"
          nav={nav.tags}
          onClick={onClick}
          root="tags"
          showLabel={true}
        />
      </Drawer>
    </>
  );
};

export default MobileNav;
