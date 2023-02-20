import Box from '@mui/material/Box';

import TagButtons from 'components/Tags/TagButtons/TagButtons';

import { TagDefaultFragment } from 'types/queries';

interface TagsProps {
  tags: (TagDefaultFragment | null)[];
}

const Tags = ({ tags }: TagsProps) =>
  tags && tags.length > 0 ? (
    <Box mt={4} className="tags">
      <TagButtons tags={tags} />
    </Box>
  ) : null;

export default Tags;
