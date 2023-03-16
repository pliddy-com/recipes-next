import Link from 'next/link';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CategoryMenu from 'components/Navigation/NavMenu/CategoryMenu/CategoryMenu';

import { TaxonomyChildrenItem } from 'types/queries';
import ListSubheader from '@mui/material/ListSubheader';

interface NavMenuType {
  featuredLabel?: string;
  featuredUrl?: string;
  id: 'categories' | 'cuisine' | 'tags';
  isOpen: boolean;
  nav: TaxonomyChildrenItem[];
  onClose: VoidFunction;
  root: string;
}

const NavMenu = ({
  featuredLabel,
  featuredUrl,
  id,
  isOpen,
  nav,
  onClose,
  root,
}: NavMenuType) => {
  return (
    <Drawer
      anchor="right"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      onClose={onClose}
      open={isOpen}
      className="menu"
      variant="temporary"
    >
      <List
        aria-label={`${id} menu`}
        role="menu"
        component="nav"
        subheader={<ListSubheader>{id}</ListSubheader>}
      >
        {featuredLabel && featuredUrl && (
          <>
            <ListItem className="menuItem featured">
              <ListItemButton
                component={Link}
                href={featuredUrl}
                onClick={onClose}
              >
                <ListItemText primary={featuredLabel} />
              </ListItemButton>
            </ListItem>

            <Divider />
          </>
        )}
        {nav &&
          nav.map((item) => {
            // if includes 'tag', it's a Taxonomy, else it's a Tag
            const categoryTag =
              item && item.__typename === 'Taxonomy' ? item.tag : item;

            const { linkedFrom } = categoryTag ?? {};

            return linkedFrom && 'recipeCollection' in linkedFrom ? (
              <CategoryMenu
                key={item?.slug}
                category={item}
                onClick={onClose}
                root={root}
              />
            ) : null;
          })}
      </List>
    </Drawer>
  );
};

export default NavMenu;
