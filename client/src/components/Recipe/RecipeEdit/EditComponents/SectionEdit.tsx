import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CancelIcon from '@mui/icons-material/Cancel';

import ListEdit from './ListEdit';
import TextEdit from './TextEdit';

import { toSlug } from 'lib/utils';

import { IRecipeSection } from 'types/content';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface ISectionEdit {
  id: string;
  label: string;
  onChange({ id, value }: { id: string; value: IRecipeSection[] }): void;
  sectionList: IRecipeSection[];
}

const SectionEdit = ({ id, label, onChange, sectionList }: ISectionEdit) => {
  const [sectionData, setSectionData] = useState<IRecipeSection[]>(sectionList);

  const updateSection = ({
    index,
    value
  }: {
    index: number;
    value: (string | null)[];
  }) => {
    const sections = [...sectionData];
    const section = { ...sections[index] };
    section.sectionItems = value;
    sections[index] = section;

    setSectionData(sections);
    onChange({ id, value: sections });
  };

  const updateTitle = ({ index, value }: { index: number; value: string }) => {
    const sections = [...sectionData];
    const section = { ...sections[index] };
    section.sectionTitle = value;
    sections[index] = section;

    setSectionData(sections);
    onChange({ id, value: sections });
  };

  const moveSection = ({
    index,
    direction
  }: {
    index: number;
    direction: 'up' | 'down';
  }) => {
    const array = [...sectionData];
    const element = array.splice(index, 1)[0];

    array.splice(direction === 'up' ? index - 1 : index + 1, 0, element);

    setSectionData(array);
    onChange({ id, value: array });
  };

  const removeSection = ({ index }: { index: number }) => {
    const array = [...sectionData];
    array.splice(index, 1);
    setSectionData(array);
    onChange({ id, value: array });
  };

  const addSection = () => {
    const array = [...sectionData];
    const section: IRecipeSection = {
      sectionTitle: 'New Section',
      sectionItems: ['New Item']
    };

    array.push(section);
    setSectionData(array);
    onChange({ id, value: array });
  };

  return (
    <Box className="sectionEdit">
      <Typography variant="h2">{label}</Typography>
      {sectionData.map((section, index) => {
        const { sectionItems, sectionTitle } = section;
        return sectionItems && sectionTitle ? (
          <Box key={`section-title-${index}`} className="edit-section">
            <TextEdit
              className="bold"
              id={`${toSlug(sectionTitle)}-title`}
              endAdornment={
                <>
                  <IconButton
                    aria-label="move section up"
                    disabled={index === 0 || !section}
                    edge="end"
                    onClick={() => moveSection({ index, direction: 'up' })}
                  >
                    <ArrowCircleUpIcon />
                  </IconButton>
                  <IconButton
                    aria-label="move section down"
                    disabled={index === sectionData.length - 1 || !section}
                    edge="end"
                    onClick={() => moveSection({ index, direction: 'down' })}
                  >
                    <ArrowCircleDownIcon />
                  </IconButton>
                  <IconButton
                    aria-label="remove section"
                    edge="end"
                    onClick={() => removeSection({ index })}
                  >
                    <CancelIcon />
                  </IconButton>
                </>
              }
              label={sectionTitle}
              onChange={(e) => updateTitle({ index, value: e.target.value })}
              value={sectionTitle}
            />

            <ListEdit
              heading="h3"
              id={toSlug(sectionTitle).toLowerCase()}
              label={sectionTitle}
              list={sectionItems}
              onChange={({ value }) => updateSection({ index, value })}
            />
          </Box>
        ) : null;
      })}
      <Button
        aria-label="add section"
        onClick={addSection}
        size="large"
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Add Section
      </Button>
    </Box>
  );
};

export default SectionEdit;
