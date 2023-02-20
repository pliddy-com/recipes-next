import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LogoButton from 'components/Navigation/LogoButton/LogoButton';
import MenuButton from 'components/Navigation/MenuButton/MenuButton';
import NavMenu from 'components/Navigation/NavMenu/NavMenu';

import { Taxonomy } from 'types/queries';

interface NavBarProps {
  nav?: Taxonomy;
}

const NavBar = ({ nav }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <AppBar component="nav" data-testid="NavBar">
      <Toolbar>
        <LogoButton />
        {nav && <MenuButton onClick={handleDrawerToggle} />}
      </Toolbar>
      {nav && (
        <NavMenu
          nav={nav}
          onClick={handleDrawerToggle}
          isOpen={isDrawerOpen}
          data-testid="nav-menu"
        />
      )}
    </AppBar>
  );
};

export default NavBar;
