import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import KitchenTwoToneIcon from '@mui/icons-material/KitchenTwoTone';

import { Maybe, Scalars } from 'types/queries';

interface EquipmentSectionProps {
  equipment?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const EquipmentSection = ({ equipment }: EquipmentSectionProps) =>
  equipment ? (
    <Stack direction="column" className="equipment">
      <Typography variant="h2">Equipment</Typography>
      <List className="recipeList equipmentList">
        {equipment &&
          equipment.map((item) => (
            <ListItem key={item} disableGutters>
              <ListItemIcon>
                <KitchenTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
      </List>
    </Stack>
  ) : null;

export default EquipmentSection;
