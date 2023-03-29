import { MouseEventHandler } from 'react';

import Link from 'next/link';

import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import CategoryMenu from 'components/Navigation/NavMenu/CategoryMenu/CategoryMenu';

import { TaxonomyChildrenItem } from 'types/queries';
import ListSubheader from '@mui/material/ListSubheader';

export interface NavMenuListProps {
  className: string;
  featuredLabel?: string;
  featuredUrl?: string;
  id: string;
  label: string;
  onClick: MouseEventHandler;
  nav: TaxonomyChildrenItem[];
  root: string;
  showLabel?: boolean;
}

const NavMenuList = ({
  className,
  featuredLabel,
  featuredUrl,
  id,
  label,
  nav,
  onClick,
  root,
  showLabel
}: NavMenuListProps) => {
  return (
    <MenuList
      aria-label={`${id} menu`}
      className={className}
      role="menu"
      component="nav"
      {...(showLabel && { subheader: <ListSubheader>{label}</ListSubheader> })}
    >
      {featuredLabel && featuredUrl && (
        <MenuItem className="menuItem featured">
          <ListItemButton component={Link} href={featuredUrl} onClick={onClick}>
            <ListItemText primary={featuredLabel} />
          </ListItemButton>
          <Divider />
        </MenuItem>
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
    </MenuList>
  );
};

export default NavMenuList;
