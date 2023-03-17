import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { IngredientsDefaultFragment } from 'types/queries';

interface IngredientsProps {
  sections?: (IngredientsDefaultFragment | null)[];
}

const IngredientsSection = ({ sections }: IngredientsProps) =>
  sections ? (
    <Stack direction="column" spacing={1} className="ingredients">
      <Typography variant="h2" gutterBottom>
        Ingredients
      </Typography>
      {sections &&
        sections.map((section) => {
          const { label, ingredientList } = section ?? {};

          return (
            section &&
            label &&
            ingredientList && (
              <Stack key={label} direction="column" spacing={0}>
                {label !== 'Ingredients' && (
                  <Typography variant="h3">{label}</Typography>
                )}
                <List className="recipeList unorderedList">
                  {ingredientList.map((ingredient) => (
                    <ListItem key={ingredient} disableGutters>
                      <ListItemIcon>
                        <RestaurantMenuIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            )
          );
        })}
    </Stack>
  ) : null;

export default IngredientsSection;
