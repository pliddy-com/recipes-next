import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { IRecipeSection } from 'types/json';

import { useAuthContext } from 'contexts/Authentication';

interface InstructionsProps {
  sections?: (IRecipeSection | null)[];
}

const InstructionsSection = ({ sections }: InstructionsProps) => {
  const { isAuth } = useAuthContext();

  // use num to set starting value for each instructionList section
  // so numbering is continuous across list sections
  let num = 1;

  return sections ? (
    <Stack direction="column" spacing={1} className="instructions">
      <Stack className="recipe-header sub">
        <Typography variant="h2">Instructions</Typography>
        {isAuth && (
          <Box className="edit-box">
            <Button variant="text" startIcon={<EditIcon />} className="edit">
              Edit
            </Button>
          </Box>
        )}
      </Stack>

      {sections &&
        sections.map((section) => {
          const { sectionTitle, sectionItems } = section ?? {};
          return (
            section && (
              <Stack key={sectionTitle} direction="column" spacing={0}>
                {sections.length > 1 && (
                  <Typography variant="h3">{sectionTitle}</Typography>
                )}

                <List className="recipeList orderedList" component="ol">
                  {sectionItems &&
                    sectionItems.map((instruction) => (
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
