import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import CuisineButton from 'components/Navigation/Buttons/CuisineButton/CuisineButton';
import LogoButton from 'components/Navigation/Buttons/LogoButton/LogoButton';
import MenuButton from 'components/Navigation/Buttons/CategoriesButton/CategoriesButton';
import NavMenu from 'components/Navigation/NavMenu/NavMenu';
import TagButton from 'components/Navigation/Buttons/TagButton/TagButton';

import { TaxonomyChildrenItem } from 'types/queries';

import theme from 'theme';

export interface NavDataProps {
  categories: TaxonomyChildrenItem[];
  cuisine: TaxonomyChildrenItem[];
  tags: TaxonomyChildrenItem[];
}

export interface NavBarProps {
  nav?: NavDataProps;
}

const NavBar = ({ nav }: NavBarProps) => {
  const hideLabel = useMediaQuery(theme.breakpoints.down('md'));
  const hideSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const { categories, cuisine, tags } = nav ?? {};

  interface navOptions {
    id: 'categories' | 'cuisine' | 'tags';
  }

  const initialState = {
    categories: false,
    cuisine: false,
    tags: false,
  };

  const [drawerState, setDrawerState] = useState(initialState);

  const handleDrawerToggle = ({ id }: navOptions) =>
    setDrawerState({ ...drawerState, [id]: !drawerState[id] });

  return (
    <AppBar component="nav" data-testid="navbar">
      <Toolbar>
        <LogoButton hideLabel={hideSmall} />
        {categories && (
          <MenuButton
            hideLabel={hideLabel}
            onClick={() => handleDrawerToggle({ id: 'categories' })}
          />
        )}
        {cuisine && (
          <CuisineButton
            hideLabel={hideLabel}
            onClick={() => handleDrawerToggle({ id: 'cuisine' })}
          />
        )}
        {tags && (
          <TagButton
            hideLabel={hideLabel}
            onClick={() => handleDrawerToggle({ id: 'tags' })}
          />
        )}
      </Toolbar>
      {categories && (
        <NavMenu
          nav={categories}
          onClose={() => handleDrawerToggle({ id: 'categories' })}
          isOpen={drawerState.categories}
          data-testid="categories-menu"
          id="categories"
          featuredLabel="All Recipes"
          featuredUrl="/"
        />
      )}
      {cuisine && (
        <NavMenu
          nav={cuisine}
          onClose={() => handleDrawerToggle({ id: 'cuisine' })}
          isOpen={drawerState.cuisine}
          data-testid="cuisine-menu"
          id="cuisine"
        />
      )}
      {tags && (
        <NavMenu
          nav={tags}
          onClose={() => handleDrawerToggle({ id: 'tags' })}
          isOpen={drawerState.tags}
          data-testid="tags-menu"
          id="tags"
          featuredLabel="All Tags"
          featuredUrl="/tag"
        />
      )}
    </AppBar>
  );
};

export default NavBar;
