import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IRecipeSection } from 'types/content';

interface InstructionsProps {
  sections?: (IRecipeSection | null)[];
}

const InstructionsSection = ({ sections }: InstructionsProps) => {
  // use num to set starting value for each instructionList section
  // so numbering is continuous across list sections
  let num = 1;

  return sections ? (
    <Stack direction="column" spacing={1} className="instructions">
      <Typography variant="h2">Instructions</Typography>

      {sections &&
        sections.map((section) => {
          const { id, sectionTitle, itemList } = section ?? {};
          return (
            section && (
              <Stack key={id} direction="column" spacing={0}>
                {sections.length > 1 && (
                  <Typography variant="h3">{sectionTitle}</Typography>
                )}

                <List className="recipeList orderedList" component="ol">
                  {itemList &&
                    itemList.map((instruction) => (
                      <ListItem
                        key={`instruction-${instruction?.id}`}
                        disableGutters
                      >
                        <ListItemAvatar>
                          <Avatar>{num++}.</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={instruction?.value} />
                      </ListItem>
                    ))}
                </List>
              </Stack>
            )
          );
        })}
    </Stack>
  ) : null;
};

export default InstructionsSection;
