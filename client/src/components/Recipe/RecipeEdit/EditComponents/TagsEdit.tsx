import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { getTagList } from 'lib/api';

import { TagDefaultFragment } from 'types/queries';

export interface ITagsEdit {
  onChange: ({
    value
  }: {
    value: (TagDefaultFragment | null | undefined)[];
  }) => void;
  tags: (TagDefaultFragment | null | undefined)[];
}

const TagsEdit = ({ tags, onChange }: ITagsEdit) => {
  const [tagData, setTagData] = useState<
    (TagDefaultFragment | null | undefined)[]
  >(tags || []);
  const [tagList, setTagList] = useState<TagDefaultFragment[]>();
  const [tagLabels, setTagLabels] = useState<string[]>([]);

  useEffect(() => {
    if (tags) {
      setTagData(tags);
      setTagLabels(tags.map((tag) => tag?.title as string));
    }
  }, [tags]);

  useEffect(() => {
    getTagList().then((taglist) => setTagList(taglist));
  }, []);

  const handleSelect = (event: SelectChangeEvent<typeof tagLabels>) => {
    const {
      target: { value }
    } = event;

    if (Array.isArray(value)) {
      const selectedTags = value?.map((title: string) =>
        tagList?.find((tag) => tag?.title === title)
      );

      const tagTitles = selectedTags.map((tag) => tag?.title as string);

      setTagLabels(tagTitles);
      setTagData(selectedTags);
      onChange({ value: selectedTags });
    }
  };

  return tagData && tagList ? (
    <Stack className="tags-edit" data-testid="tags-edit">
      <FormControl>
        <InputLabel id="tag-select-label">Tags</InputLabel>
        <Select
          data-testid="tag-select"
          id="tag-select"
          input={
            <OutlinedInput
              id="tag-select-input"
              label="Tags"
              data-testid="tag-select-input"
            />
          }
          inputProps={{ 'aria-label': 'tag select input' }}
          labelId="tag-select-label"
          MenuProps={{ PaperProps: { sx: { maxHeight: 42 * 6 } } }}
          multiple
          onChange={handleSelect}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tagData &&
                tagData.map((tag) => {
                  return (
                    <Chip
                      className="tag"
                      color="primary"
                      label={tag?.title}
                      key={tag?.slug}
                      role="button"
                      size="small"
                      variant="outlined"
                    />
                  );
                })}
            </Box>
          )}
          value={tagLabels}
        >
          {tagList.map((tag) => {
            const { slug, title } = tag;
            return (
              slug &&
              title && (
                <MenuItem
                  data-testid={`tag-select-${slug}`}
                  key={slug}
                  value={title}
                  className="selectMenu"
                >
                  {title}
                </MenuItem>
              )
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  ) : null;
};

export default TagsEdit;
