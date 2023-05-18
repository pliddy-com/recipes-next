/* istanbul ignore file */

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

import { getTagList } from 'lib/api';

import { TagDefaultFragment } from 'types/queries';

interface ITagsEdit {
  tags: (TagDefaultFragment | null)[];
}

const TagsEdit = ({ tags }: ITagsEdit) => {
  const [tagData, setTagData] =
    useState<(TagDefaultFragment | null | undefined)[]>(tags);
  const [tagList, setTagList] = useState<(TagDefaultFragment | null)[]>();
  const [tagLabels, setTagLabels] = useState<string[]>([]);

  useEffect(() => {
    setTagData(tags);
    setTagLabels(tags.map((tag) => tag?.title as string));
  }, [tags]);

  useEffect(() => {
    getTagList().then((tags) => setTagList(tags));
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
    }
  };

  return (
    <Stack className="tags-edit">
      {/* <Typography variant="h2">Tags</Typography> */}
      {/* <Stack direction="row">
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
      </Stack> */}
      <FormControl>
        <InputLabel id="tag-select-label">Tags</InputLabel>
        <Select
          id="tag-select"
          input={<OutlinedInput id="tag-select-input" label="Tags" />}
          labelId="tag-select-label"
          MenuProps={{ PaperProps: { sx: { maxHeight: 42 * 6 } } }}
          multiple
          onChange={handleSelect}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tagData &&
                tagData.map((tag) => {
                  const { slug, title } = tag ?? {};
                  return slug && title ? (
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
            </Box>
          )}
          value={tagLabels}
        >
          {tagList &&
            tagList.map((tag) => {
              const { slug, title } = tag ?? {};
              return slug && title ? (
                <MenuItem key={slug} value={title} className="selectMenu">
                  {title}
                </MenuItem>
              ) : null;
            })}
        </Select>
      </FormControl>
    </Stack>
    // </Stack>
  );
};

export default TagsEdit;

/*
  tags: [
    {
      sys: { type: 'Link', linkType: 'Entry', id: '6NXdZjbTklEUEYXWzqjWRy' }
    },
    {
      sys: { type: 'Link', linkType: 'Entry', id: '6qEA8xrN8koGKvQfFlq15m' }
    },
    {
      sys: { type: 'Link', linkType: 'Entry', id: '1XgN8rqu0clUQxQS0wVaKA' }
    },
    {
      sys: { type: 'Link', linkType: 'Entry', id: '2RDCNcjSZzLSEQgjf1Nw4R' }
    }
  ]
*/
