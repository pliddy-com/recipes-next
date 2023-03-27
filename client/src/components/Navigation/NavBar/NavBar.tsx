import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import TagIcon from '@mui/icons-material/Tag';

import LogoButton from 'components/Navigation/Buttons/LogoButton/LogoButton';
import NavMenu from 'components/Navigation/NavMenu/NavMenu';

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
  // TODO: don't use hook, just use media query styles
  const hideLabel = useMediaQuery(theme.breakpoints.down('md'));

  const { categories, cuisine, tags } = nav ?? {};

  // THIS IS THE DESKTOP (NON-MOBILE) MENU BAR
  // TODO: create an alternate version with a single menu and show by CSS media queries
  return (
    <>
      <AppBar component="nav" data-testid="navbar">
        <Toolbar className="menu">
          <LogoButton hideLabel={hideLabel} />
          {categories && (
            <NavMenu
              ariaLabel="open categories menu"
              label="Categories"
              icon={<MenuIcon />}
              data-testid="categories-menu"
              featuredLabel="All Recipes"
              featuredUrl="/"
              id="categories"
              nav={categories}
              root="tag"
            />
          )}
          {cuisine && (
            <NavMenu
              ariaLabel="open cuisine menu"
              label="Cuisine"
              icon={<LanguageIcon />}
              data-testid="cuisine-menu"
              id="cuisine"
              nav={cuisine}
              root="tag"
            />
          )}
          {tags && (
            <NavMenu
              ariaLabel="open tags menu"
              label="Tags"
              icon={<TagIcon />}
              data-testid="tags-menu"
              featuredLabel="All Tags"
              featuredUrl="/tag"
              id="tags"
              nav={tags}
              root="tag"
            />
          )}
          <SearchButton hideLabel={hideLabel} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
