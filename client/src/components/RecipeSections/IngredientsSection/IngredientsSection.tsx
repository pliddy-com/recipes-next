import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/edit';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { IRecipeSection } from 'types/json';

import { useAuthContext } from 'contexts/Authentication';

import colors from 'theme/values/colors';

interface IngredientsProps {
  sections?: (IRecipeSection | null)[];
}

const IngredientsSection = ({ sections }: IngredientsProps) => {
  const { isAuth } = useAuthContext();

  return sections ? (
    <Stack direction="column" spacing={1} className="ingredients">
      <Stack
        direction="row"
        flex="true"
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            flexGrow: 1
          }}
        >
          Ingredients
        </Typography>
        {isAuth && (
          <Box
            sx={{
              alignItems: 'center',
              borderBottom: `1px solid ${colors.secondary.main}`,
              display: 'flex',
              marginBottom: '8.5px'
            }}
          >
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

// sections ? (
//   <Stack direction="column" spacing={1} className="ingredients">
//     <Typography variant="h2" gutterBottom>
//       Ingredients
//     </Typography>
//     <Stack direction="row" flex="true" sx={{ justifyContent: 'space-between' }}>
//       <Typography
//         variant="h1"
//         gutterBottom
//         sx={{
//           flexGrow: 1
//         }}
//       >
//         {title}
//       </Typography>
//       {isAuth && (
//         <Box
//           sx={{
//             alignItems: 'center',
//             borderBottom: `1px solid ${colors.secondary.main}`,
//             display: 'flex',
//             marginBottom: '10.5px'
//           }}
//         >
//           <Button variant="text" startIcon={<EditIcon />} className="edit">
//             Edit
//           </Button>
//         </Box>
//       )}
//     </Stack>) : null

export default IngredientsSection;
