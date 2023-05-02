import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { IRecipeSection } from 'types/json';

interface IngredientsProps {
  sections?: (IRecipeSection | null)[];
}

const IngredientsSection = ({ sections }: IngredientsProps) => {
  return sections ? (
    <Stack direction="column" spacing={1} className="ingredients">
      <Typography variant="h2">Ingredients</Typography>
      {sections &&
        sections.map((section) => {
          const { sectionTitle, sectionItems } = section ?? {};

          return (
            section &&
            sectionTitle &&
            sectionItems && (
              <Stack key={sectionTitle} direction="column" spacing={0}>
                {sectionTitle !== 'Ingredients' && (
                  <Typography variant="h3">{sectionTitle}</Typography>
                )}
                <List className="recipeList unorderedList">
                  {sectionItems.map((ingredient) => (
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
};

export default IngredientsSection;
