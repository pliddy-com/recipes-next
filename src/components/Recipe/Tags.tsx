import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TagButtons from 'components/TagButtons';

import { TagDefaultFragment, Tag } from 'types/generated/graphql';

type TagsProps = {
  tags: TagDefaultFragment[];
};

const Tags = ({ tags }: TagsProps) => {
  if (!tags) return null;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Tags
      </Typography>
      <TagButtons tags={tags as Tag[]} />
    </Box>
  );
};

export default Tags;
