import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import SyncIcon from '@mui/icons-material/Sync';
import TagIcon from '@mui/icons-material/Tag';

import LogoButton from 'components/Navigation/Buttons/LogoButton/LogoButton';
import MobileNavControl from 'components/Navigation/MobileNavControl/MobileNavControl';
import NavMenuControl from 'components/Navigation/NavMenuControl/NavMenuControl';
import SearchButton from 'components/Navigation/Buttons/SearchButton/SearchButton';
import SignInControl from '../../SignIn/SignInControl/SignInControl';

import { useAuthContext } from 'contexts/Authentication';
import { useContentManagementContext } from 'contexts/Content';

import { TaxonomyChildrenItem } from 'types/queries';

export interface NavDataProps {
  categories: TaxonomyChildrenItem[];
  cuisine: TaxonomyChildrenItem[];
  tags: TaxonomyChildrenItem[];
}

export interface NavBarProps {
  nav?: NavDataProps;
}

const NavBar = ({ nav }: NavBarProps) => {
  const { categories, cuisine, tags } = nav ?? {};
  const { isAuth } = useAuthContext();
  const { canSave, editMode, toggleEdit, saveRecipe, supressEdit } =
    useContentManagementContext();
  const { asPath } = useRouter();

  const isRecipePage = asPath.startsWith('/recipes/');

  return (
    <AppBar component="nav" data-testid="navbar">
      <Toolbar className="navbar">
        <LogoButton />
        {nav ? (
          <>
            <Box className="mobile-nav">
              <SignInControl hideLabel={true} />
              <MobileNavControl ariaLabel="open navigation menu" nav={nav} />
            </Box>

            <Box className="desktop-nav">
              {categories && (
                <NavMenuControl
                  ariaLabel="open categories menu"
                  label="Categories"
                  icon={<MenuIcon />}
                  data-testid="categories-menu"
                  featuredLabel="All Recipes"
                  featuredUrl="/"
                  id="categories"
                  nav={categories}
                  root="tags"
                />
              )}

              {cuisine && (
                <NavMenuControl
                  ariaLabel="open cuisine menu"
                  label="Cuisine"
                  icon={<LanguageIcon />}
                  data-testid="cuisine-menu"
                  id="cuisine"
                  nav={cuisine}
                  root="tags"
                />
              )}

              {tags && (
                <NavMenuControl
                  ariaLabel="open tags menu"
                  label="Tags"
                  icon={<TagIcon />}
                  data-testid="tags-menu"
                  featuredLabel="All Tags"
                  featuredUrl="/tags"
                  id="tags"
                  nav={tags}
                  root="tags"
                />
              )}

              <SearchButton />
              <SignInControl />
            </Box>
          </>
        ) : null}
      </Toolbar>
      {isAuth && isRecipePage && !supressEdit ? (
        <Toolbar className="userBar">
          {editMode && (
            <Button
              className="user save"
              disabled={!canSave}
              onClick={saveRecipe}
              startIcon={canSave ? <SyncIcon /> : <SyncDisabledIcon />}
              variant="text"
            >
              Save
            </Button>
          )}
          <Button
            className="user edit"
            onClick={toggleEdit}
            startIcon={editMode ? <CancelIcon /> : <EditIcon />}
            variant="text"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </Toolbar>
      ) : null}
    </AppBar>
  );
};

export default NavBar;
