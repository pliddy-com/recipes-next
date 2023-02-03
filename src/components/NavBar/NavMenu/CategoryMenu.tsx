import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import CategoryListItemButton from 'components/NavBar/NavMenu/CategoryListItemButton';
import SubcategoryMenu from 'components/NavBar/NavMenu/SubcategoryMenu';

import { Maybe, TaxonomyChildrenItem } from 'types/generated/graphql';

import { categoryMenuStyles } from 'lib/styles';

interface CategoryMenuProps {
  category?: Maybe<TaxonomyChildrenItem>;
  onClick: VoidFunction;
}

const CategoryMenu = ({ category, onClick }: CategoryMenuProps) => {
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

  return (
    <Box>
      {categoryChildrenCollection ? (
        <SubcategoryMenu category={category} onClick={onClick} />
      ) : (
        <ListItem sx={categoryMenuStyles.menuItem}>
          <CategoryListItemButton
            slug={slug}
            title={title}
            onClick={onClick}
            total={numRecipes}
          />
        </ListItem>
      )}
    </Box>
  );
};

export default CategoryMenu;
