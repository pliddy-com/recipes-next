import { useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import CategoryListItemButton from 'components/NavBar/NavMenu/CategoryListItemButton/CategoryListItemButton';

import { Maybe, Tag, TaxonomyChildrenItem } from 'types/generated/graphql';

interface SubcategoryMenuProps {
  category?: Maybe<TaxonomyChildrenItem>;
  onClick: VoidFunction;
}

const SubcategoryMenu = ({ category, onClick }: SubcategoryMenuProps) => {
  const [open, setOpen] = useState(false);
  const { slug, title } = category ?? {};

  const categoryTag =
    category && 'tag' in category ? category.tag : (category as Tag);

  const categoryChildrenCollection =
    category && 'childrenCollection' in category
      ? category.childrenCollection
      : undefined;

  const { linkedFrom } = categoryTag ?? {};
  const { recipeCollection } = linkedFrom ?? {};
  const { total } = recipeCollection ?? {};

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItem
        className="menuItem"
        secondaryAction={
          <IconButton edge="end" aria-label="expand" onClick={toggleDropdown}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <CategoryListItemButton
          slug={slug}
          title={title}
          onClick={onClick}
          total={total}
        />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {categoryChildrenCollection?.items.map(
            (child: Maybe<TaxonomyChildrenItem>) => {
              const { slug, title, sys } = child ?? {};
              const { id } = sys ?? {};
              const categoryTag = child as Tag;
              const { linkedFrom } = categoryTag ?? {};
              const { recipeCollection } = linkedFrom ?? {};
              const { total } = recipeCollection ?? {};

              return total ? (
                <ListItem key={id} className="subMenuItem">
                  <CategoryListItemButton
                    slug={slug}
                    title={title}
                    onClick={onClick}
                    total={total}
                  />
                </ListItem>
              ) : null;
            }
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default SubcategoryMenu;
