import { MouseEventHandler, useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import CategoryListItemButton from '../CategoryListItemButton/CategoryListItemButton';

import { Maybe, Tag, TaxonomyChildrenItem } from 'types/queries';

interface SubcategoryMenuProps {
  category?: Maybe<TaxonomyChildrenItem>;
  onClick: MouseEventHandler;
  root: string;
}

const SubcategoryMenu = ({ category, onClick, root }: SubcategoryMenuProps) => {
  const [open, setOpen] = useState(false);
  const { slug, title } = category ?? {};

  const categoryTag =
    category && 'tag' in category ? category.tag : (category as Tag);

  const categoryChildren =
    category && 'childrenCollection' in category
      ? category?.childrenCollection?.items
      : undefined;

  const { linkedFrom } = categoryTag ?? {};
  const { recipeCollection } = linkedFrom ?? {};
  const { total } = recipeCollection ?? {};

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return slug && title && categoryChildren ? (
    <Box>
      <MenuItem
        component={ListItem}
        data-testid="category item"
        className="menuItem"
        role="menuitem"
        secondaryAction={
          <IconButton
            role="button"
            edge="end"
            aria-label="expand"
            onClick={toggleDropdown}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <CategoryListItemButton
          slug={slug}
          title={title}
          onClick={onClick}
          total={total}
          root={root}
        />
      </MenuItem>
      <Collapse in={open} timeout="auto" data-testid={`${title} menu`}>
        {categoryChildren && (
          <List component="div" disablePadding>
            {categoryChildren.map((child) => {
              const { slug, title } = child ?? {};
              const categoryTag = child as Tag;
              const { linkedFrom } = categoryTag ?? {};
              const { recipeCollection } = linkedFrom ?? {};
              const { total } = recipeCollection ?? {};

              return child && slug && title && total ? (
                <MenuItem
                  className="subMenuItem"
                  data-testid="subcategory item"
                  key={slug}
                >
                  <CategoryListItemButton
                    slug={slug}
                    title={title}
                    onClick={onClick}
                    total={total}
                    root={root}
                  />
                </MenuItem>
              ) : null;
            })}
          </List>
        )}
      </Collapse>
    </Box>
  ) : null;
};

export default SubcategoryMenu;
