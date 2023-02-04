import Link from 'next/link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe } from 'types/generated/graphql';

interface CategoryListItemButtonProps {
  onClick: VoidFunction;
  slug: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
  total?: number;
}

const CategoryListItemButton = ({
  onClick,
  slug,
  title,
  total,
}: CategoryListItemButtonProps) => {
  return (
    <ListItemButton
      component={Link}
      href={`/category/${slug}`}
      onClick={onClick}
    >
      <ListItemText primary={`${title} (${total})`} className="menuItem" />
    </ListItemButton>
  );
};

export default CategoryListItemButton;
