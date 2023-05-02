import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SkilletIcon from 'components/Icons/SkilletIcon/SkilletIcon';

import { Maybe, Scalars } from 'types/queries';

interface EquipmentSectionProps {
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const EquipmentSection = ({ equipment }: EquipmentSectionProps) => {
  return equipment ? (
    <Stack direction="column" className="equipment">
      <Typography variant="h2">Equipment</Typography>
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
