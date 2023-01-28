import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { InstructionsDefaultFragment } from 'types/generated/graphql';

interface InstructionsProps {
  sections?: InstructionsDefaultFragment[];
}

const Instructions = ({ sections }: InstructionsProps) => {
  if (!sections) return null;

  // use num to set starting value for each instructionList section
  // so numbering is continuous across list sections
  let num = 1;

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h2" gutterBottom>
        Instructions
      </Typography>
      {sections &&
        sections.map((section) => {
          const { label, instructionList } = section ?? {};
          const instructions = instructionList;
          return (
            <Stack key={label} direction="column" spacing={0}>
              <Typography variant="h3">{label}</Typography>

              <List className="recipeList">
                {instructions &&
                  instructions.map((instruction) => (
                    <ListItem key={`instruction-${num}`} disableGutters>
                      <ListItemAvatar>
                        <Avatar color="secondary">{num++}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={instruction} />
                    </ListItem>
                  ))}
              </List>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Instructions;
