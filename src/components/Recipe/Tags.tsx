import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TagButtons from 'components/TagButtons';

import { TagDefaultFragment, Tag } from 'types/generated/graphql';

interface TagsProps {
  tags: (TagDefaultFragment | null)[];
}

const Tags = ({ tags }: TagsProps) => {
  if (!tags) return null;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Tags
      </Typography>
      <TagButtons tags={tags} />
    </Box>
  );
};

export default Tags;
