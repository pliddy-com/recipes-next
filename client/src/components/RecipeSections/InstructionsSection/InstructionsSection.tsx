import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { InstructionsDefaultFragment } from 'types/queries';

interface InstructionsProps {
  sections?: (InstructionsDefaultFragment | null)[];
}

const InstructionsSection = ({ sections }: InstructionsProps) => {
  // use num to set starting value for each instructionList section
  // so numbering is continuous across list sections
  let num = 1;

  return sections ? (
    <Stack direction="column" spacing={1} className="instructions">
      <Typography variant="h2" gutterBottom>
        Instructions
      </Typography>
      {sections &&
        sections.map((section) => {
          const { label, instructionList } = section ?? {};
          const instructions = instructionList;
          return (
            instructions && (
              <Stack key={label} direction="column" spacing={0}>
                {sections.length > 1 && (
                  <Typography variant="h3">{label}</Typography>
                )}

                <List className="recipeList orderedList" component="ol">
                  {instructions &&
                    instructions.map((instruction) => (
                      <ListItem key={`instruction-${num}`} disableGutters>
                        <ListItemAvatar>
                          <Avatar>{num++}.</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={instruction} />
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
