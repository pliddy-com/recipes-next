import { useState } from 'react';
import Link from 'next/link';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import NavIconButton from '../Buttons/NavIconButton/NavIconButton';
import NavMenuList from '../NavMenuList/NavMenuList';

import { useAuthContext } from 'contexts/Authentication';

import { TaxonomyChildrenItem } from 'types/queries';

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
  const { isAuth, signOut } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const onClick = () => handleToggle();
  const onClose = () => handleToggle();

  const onSignOutClick = () => {
    handleToggle();
    signOut();
  };

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
            <ListItemButton
              aria-label={isAuth ? 'sign out' : 'sign in'}
              {...(!isAuth ? { href: '/signin' } : {})}
              onClick={isAuth ? onSignOutClick : onClick}
            >
              <ListItemText primary={isAuth ? 'Sign Out' : 'Sign In'} />
              <ListItemIcon>
                {isAuth ? (
                  <LogoutIcon fontSize="small" />
                ) : (
                  <LoginIcon fontSize="small" />
                )}
              </ListItemIcon>
            </ListItemButton>
          </MenuItem>

          <Divider style={{ marginTop: 0, marginBottom: 0 }} />

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
