import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ListEdit from './ListEdit';
import TextEdit from './TextEdit';

import { toSlug } from 'lib/utils';

import { IRecipeSection } from 'types/content';

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

  return (
    <>
      <Typography variant="h2">{label}</Typography>
      {sectionData.map((section, index) => {
        const { sectionItems, sectionTitle } = section;
        return sectionItems && sectionTitle ? (
          <Box key={`section-title-${index}`}>
            <TextEdit
              className="bold"
              id={`${toSlug(sectionTitle)}-title`}
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
    </>
  );
};

export default SectionEdit;
