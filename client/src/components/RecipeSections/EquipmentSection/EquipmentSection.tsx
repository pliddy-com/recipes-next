import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import EditIcon from '@mui/icons-material/Edit';
import EditIcon from '@mui/icons-material/Edit';

import SkilletIcon from 'components/Icons/SkilletIcon/SkilletIcon';

import { Maybe, Scalars } from 'types/queries';

import { useAuthContext } from 'contexts/Authentication';

interface EquipmentSectionProps {
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const EquipmentSection = ({ equipment }: EquipmentSectionProps) => {
  const { isAuth } = useAuthContext();

  return equipment ? (
    <Stack direction="column" className="equipment">
      <Stack className="recipe-header sub">
        <Typography variant="h2">Equipment</Typography>
        {isAuth && (
          <Box className="edit-box">
            <Button variant="text" startIcon={<EditIcon />} className="edit">
              Edit
            </Button>
          </Box>
        )}
      </Stack>

      <List className="recipeList unorderedList">
        {equipment &&
          equipment.map((item) => (
            <ListItem key={item} disableGutters>
              <ListItemIcon>
                <SkilletIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
      </List>
    </Stack>
  ) : null;
};

export default EquipmentSection;
