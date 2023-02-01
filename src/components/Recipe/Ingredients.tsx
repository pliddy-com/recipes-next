import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { IngredientsDefaultFragment } from 'types/generated/graphql';

const styles = {
  bullets: {
    height: '32px',
  },
};

interface IngredientsProps {
  sections?: (IngredientsDefaultFragment | null)[];
}

const Ingredients = ({ sections }: IngredientsProps) => {
  if (!sections) return null;

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h2" gutterBottom>
        Ingredients
      </Typography>
      {sections &&
        sections.map((section) => {
          const { label, ingredientList } = section ?? {};
          const ingredients = ingredientList;

          return (
            <Stack key={label} direction="column" spacing={0}>
              {label !== 'Ingredients' && (
                <Typography variant="h3">{label}</Typography>
              )}
              <List className="recipeList">
                {ingredients &&
                  ingredients.map((ingredient) => (
                    <ListItem key={ingredient} disableGutters>
                      <ListItemIcon>
                        <RestaurantMenuIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={ingredient} sx={styles.bullets} />
                    </ListItem>
                  ))}
              </List>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Ingredients;
