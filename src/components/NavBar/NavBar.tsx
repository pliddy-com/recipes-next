import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LogoButton from 'components/NavBar/LogoButton/LogoButton';
import MenuButton from 'components/NavBar/MenuButton/MenuButton';
import NavMenu from 'components/NavBar/NavMenu/NavMenu';

import { Taxonomy } from 'types/generated/graphql';

interface NavBarProps {
  nav?: Taxonomy;
}

const NavBar = ({ nav }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <AppBar component="nav">
      <Toolbar>
        <LogoButton />
        <MenuButton onClick={handleDrawerToggle} />
      </Toolbar>
      <NavMenu nav={nav} onClick={handleDrawerToggle} isOpen={isDrawerOpen} />
    </AppBar>
  );
};

export default NavBar;
