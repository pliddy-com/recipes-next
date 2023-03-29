import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import CategoryListItemButton from 'components/Navigation/NavMenu/CategoryListItemButton/CategoryListItemButton';
import SubcategoryMenu from 'components/Navigation/NavMenu/SubcategoryMenu/SubcategoryMenu';
import { MouseEventHandler } from 'react';

import { Maybe, TaxonomyChildrenItem } from 'types/queries';

interface CategoryMenuProps {
  category?: Maybe<TaxonomyChildrenItem>;
  onClick: MouseEventHandler;
  root: string;
}

const CategoryMenu = ({ category, onClick, root }: CategoryMenuProps) => {
  const { slug, title } = category ?? {};

  const categoryTag = category && 'tag' in category ? category.tag : category;

  const categoryChildrenCollection =
    category && 'childrenCollection' in category
      ? category.childrenCollection
      : undefined;

  const { linkedFrom: tagLinks } = categoryTag ?? {};
  const { linkedFrom: categoryLinks } = category ?? {};

  const categoryRecipes =
    categoryLinks && 'recipeCollection' in categoryLinks
      ? categoryLinks?.recipeCollection
      : undefined;

  const tagRecipes =
    tagLinks && 'recipeCollection' in tagLinks
      ? tagLinks?.recipeCollection
      : undefined;

  const recipeCollection = categoryRecipes || tagRecipes;
  const numRecipes = recipeCollection?.total;

  return category ? (
    <Box>
      {categoryChildrenCollection ? (
        <SubcategoryMenu category={category} onClick={onClick} root={root} />
      ) : (
        <MenuItem className="menuItem" role="menuitem">
          <CategoryListItemButton
            root={root}
            slug={slug}
            title={title}
            onClick={onClick}
            total={numRecipes}
          />
        </MenuItem>
      )}
    </Box>
  ) : null;
};

export default CategoryMenu;
