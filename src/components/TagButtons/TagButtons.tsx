import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { TagDefaultFragment } from 'types/generated/graphql';

import { tagButtons } from 'lib/styles';

interface TagButtonsProps {
  tags?: (TagDefaultFragment | null)[];
}

const TagButtons = ({ tags }: TagButtonsProps) => {
  return tags ? (
    <Stack direction="row" sx={tagButtons.tags}>
      {tags &&
        tags.map((tag) => {
          const { slug, title } = tag ?? {};

          return tag && slug && title ? (
            <Button
              color="primary"
              component={Link}
              key={slug}
              role="button"
              size="small"
              sx={tagButtons.button}
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
