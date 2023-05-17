/* istanbul ignore file */

import { useEffect, useState } from 'react';

// import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
// import PayloadRender from 'components/PayloadRender/PayloadRender';
import { TagDefaultFragment } from 'types/queries';
import Chip from '@mui/material/Chip';
import { getTagList } from 'lib/api';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/system/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

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
      <Stack direction="row">
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
      </Stack>
      {/* <PayloadRender payload={tags} /> */}

      <FormControl
      // sx={{ m: 1, width: 300 }}
      >
        <InputLabel id="tag-select-label">Tags</InputLabel>
        <Select
          labelId="tag-select-label"
          id="tag-select"
          multiple
          value={tagLabels}
          onChange={handleSelect}
          input={<OutlinedInput id="tag-select-input" label="Tags" />}
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
          // MenuProps={MenuProps}
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
