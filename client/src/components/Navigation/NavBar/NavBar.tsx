import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
// import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import CuisineButton from 'components/Navigation/Buttons/CuisineButton/CuisineButton';
import LogoButton from 'components/Navigation/Buttons/LogoButton/LogoButton';
import CategoriesButton from 'components/Navigation/Buttons/CategoriesButton/CategoriesButton';
import NavMenu from 'components/Navigation/NavMenu/NavMenu';
import TagButton from 'components/Navigation/Buttons/TagButton/TagButton';

// import SearchBox from 'components/Search/SearchBox/SearchBox';

import { TaxonomyChildrenItem } from 'types/queries';

import theme from 'theme';
import SearchButton from 'components/Navigation/Buttons/SearchButton/SearchButton';

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

  const { categories, cuisine, tags } = nav ?? {};

  interface navOptions {
    id: 'categories' | 'cuisine' | 'tags';
  }

  const initialState = {
    categories: false,
    cuisine: false,
    tags: false
  };

  const [drawerState, setDrawerState] = useState(initialState);

  const handleDrawerToggle = ({ id }: navOptions) =>
    setDrawerState({ ...drawerState, [id]: !drawerState[id] });

  return (
    <>
      <AppBar component="nav" data-testid="navbar">
        <Toolbar className="menu">
          <LogoButton hideLabel={hideLabel} />

          {categories && (
            <CategoriesButton
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
          <SearchButton hideLabel={hideLabel} />
        </Toolbar>
        {categories && (
          <NavMenu
            data-testid="categories-menu"
            featuredLabel="All Recipes"
            featuredUrl="/"
            id="categories"
            isOpen={drawerState.categories}
            nav={categories}
            onClose={() => handleDrawerToggle({ id: 'categories' })}
            root="tag"
          />
        )}
        {cuisine && (
          <NavMenu
            data-testid="cuisine-menu"
            id="cuisine"
            isOpen={drawerState.cuisine}
            nav={cuisine}
            onClose={() => handleDrawerToggle({ id: 'cuisine' })}
            root="tag"
          />
        )}
        {tags && (
          <NavMenu
            data-testid="tags-menu"
            featuredLabel="All Tags"
            featuredUrl="/tag"
            id="tags"
            isOpen={drawerState.tags}
            nav={tags}
            onClose={() => handleDrawerToggle({ id: 'tags' })}
            root="tag"
          />
        )}
        {/* <Toolbar className="search">
          <Container maxWidth="xl">
            <SearchBox />
          </Container>
        </Toolbar> */}
      </AppBar>
    </>
  );
};

export default NavBar;
