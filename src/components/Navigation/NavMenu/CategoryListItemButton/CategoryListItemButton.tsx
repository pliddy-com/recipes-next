import Link from 'next/link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe } from 'types/queries';

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
}: CategoryListItemButtonProps) =>
  slug && title && onClick ? (
    <ListItemButton
      aria-label={`${slug} category`}
      component={Link}
      href={`/category/${slug}`}
      onClick={onClick}
    >
      <ListItemText primary={`${title} (${total})`} className="menuItem" />
    </ListItemButton>
  ) : null;

export default CategoryListItemButton;
