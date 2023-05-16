/* istanbul ignore file */

import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import PayloadRender from 'components/PayloadRender/PayloadRender';
import { TagDefaultFragment } from 'types/queries';
import Chip from '@mui/material/Chip';

interface ITagsEdit {
  tags: (TagDefaultFragment | null)[];
}

const TagsEdit = ({ tags }: ITagsEdit) => {
  const [tagData, setTagData] = useState<(TagDefaultFragment | null)[]>(tags);

  useEffect(() => {
    setTagData(tags);
  }, [tags]);

  return (
    <Stack className="tags-edit">
      <Typography variant="h2">Tags</Typography>
      <Stack direction="row" className="tags-buttons" data-testid="tag-buttons">
        {tagData &&
          tagData.map((tag) => {
            const { slug, title } = tag ?? {};

            return tag && slug && title ? (
              <Chip
                className="tag"
                color="primary"
                label={title}
                key={slug}
                role="button"
                size="small"
                variant="outlined"
              />
            ) : null;
          })}
        <PayloadRender payload={tags} />
      </Stack>
    </Stack>
  );
};

export default TagsEdit;
