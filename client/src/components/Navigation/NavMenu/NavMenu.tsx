import { useState } from 'react';

import Link from 'next/link';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CategoryMenu from 'components/Navigation/NavMenu/CategoryMenu/CategoryMenu';
import NavIconButton from 'components/Navigation/Buttons/NavIconButton/NavIconButton';

import { TaxonomyChildrenItem } from 'types/queries';
import ListSubheader from '@mui/material/ListSubheader';

interface NavMenuType {
  ariaLabel: string;
  featuredLabel?: string;
  featuredUrl?: string;
  icon: JSX.Element;
  id: string;
  label: string;
  nav: TaxonomyChildrenItem[];
  root: string;
}

const NavMenu = ({
  ariaLabel,
  featuredLabel,
  featuredUrl,
  icon,
  id,
  label,
  nav,
  root
}: NavMenuType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => setIsOpen(!isOpen);

  const onClick = () => handleDrawerToggle();
  const onClose = () => handleDrawerToggle();

  return (
    nav && (
      <>
        <NavIconButton
          ariaLabel={ariaLabel}
          className="menu-button"
          hideLabel={false}
          icon={icon}
          label={label}
          onClick={onClick}
        />
        <Drawer
          anchor="right"
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
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
                    onClick={onClick}
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
                    onClick={onClick}
                    root={root}
                  />
                ) : null;
              })}
          </List>
        </Drawer>
      </>
    )
  );
};

export default NavMenu;
