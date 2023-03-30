import { MouseEventHandler } from 'react';

import Link from 'next/link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Maybe } from 'types/queries';

interface CategoryListItemButtonProps {
  onClick: MouseEventHandler;
  root: Maybe<string> | undefined;
  slug: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
  total?: number;
}

const CategoryListItemButton = ({
  onClick,
  root,
  slug,
  title,
  total
}: CategoryListItemButtonProps) =>
  slug && title && onClick ? (
    <ListItemButton
      aria-label={`${slug} category`}
      component={Link}
      href={`/${root}/${slug}`}
      onClick={onClick}
    >
      <ListItemText primary={`${title} (${total})`} />
    </ListItemButton>
  ) : null;

export default CategoryListItemButton;
