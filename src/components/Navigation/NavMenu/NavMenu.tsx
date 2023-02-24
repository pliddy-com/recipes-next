import Link from 'next/link';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CategoryMenu from 'components/Navigation/NavMenu/CategoryMenu/CategoryMenu';

import { Taxonomy } from 'types/queries';

interface NavMenuType {
  isOpen: boolean;
  nav?: Taxonomy;
  onClick: VoidFunction;
}

const NavMenu = ({ isOpen, nav, onClick }: NavMenuType) => {
  const { childrenCollection } = nav ?? {};
  const { items: categories } = childrenCollection ?? {};

  return (
    <Drawer
      anchor="right"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      onClose={onClick}
      open={isOpen}
      className="menu"
      variant="temporary"
    >
      <List component="nav">
        <ListItem className="menuItem">
          <ListItemButton component={Link} href="/" onClick={onClick}>
            <ListItemText primary="All Recipes" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem className="menuItem">
          <ListItemButton component={Link} href="/tag" onClick={onClick}>
            <ListItemText primary="Tag Collections" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {categories &&
          categories.map((category) => {
            const categoryTag =
              category && 'tag' in category ? category.tag : category;

            const { linkedFrom } = categoryTag ?? {};

            if (linkedFrom && 'recipeCollection' in linkedFrom) {
              const { recipeCollection } = linkedFrom;
              const { total: numRecipes } = recipeCollection ?? {};

              return numRecipes ? (
                <CategoryMenu
                  key={category?.sys?.id}
                  category={category}
                  onClick={onClick}
                />
              ) : null;
            }
          })}
      </List>
    </Drawer>
  );
};

export default NavMenu;
