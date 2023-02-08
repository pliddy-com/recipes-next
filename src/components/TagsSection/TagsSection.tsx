import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TagButtons from 'components/TagButtons/TagButtons';

import { TagDefaultFragment } from 'types/generated/graphql';

interface TagsProps {
  tags: (TagDefaultFragment | null)[];
}

const Tags = ({ tags }: TagsProps) =>
  tags && tags.length > 0 ? (
    <Box data-testid="tags-section">
      <Typography variant="h2" gutterBottom>
        Tags
      </Typography>
      <TagButtons tags={tags} />
    </Box>
  ) : null;

export default Tags;
