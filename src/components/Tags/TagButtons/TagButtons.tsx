import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { TagDefaultFragment } from 'types/queries';

import { flexWrap } from 'lib/styles';

interface TagButtonsProps {
  tags?: (TagDefaultFragment | null)[];
}

const TagButtons = ({ tags }: TagButtonsProps) => {
  return tags ? (
    <Stack direction="row" sx={flexWrap} data-testid="tag-buttons">
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
              href={`/tag/${slug}`}
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
