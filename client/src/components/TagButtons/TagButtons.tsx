import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { TagDefaultFragment } from 'types/queries';

interface TagButtonsProps {
  tags?: (TagDefaultFragment | null)[];
}

const TagButtons = ({ tags }: TagButtonsProps) => {
  return tags ? (
    <Stack direction="row" className="tags-buttons" data-testid="tags-buttons">
      {tags &&
        tags.map((tag) => {
          const { slug, title } = tag ?? {};

          return tag && slug && title ? (
            <Button
              className="tag"
              color="primary"
              component={Link}
              key={slug}
              role="button"
              size="small"
              href={`/tags/${slug}`}
              variant="outlined"
            >
              {title}
            </Button>
          ) : null;
        })}
    </Stack>
  ) : null;
};

export default TagButtons;
