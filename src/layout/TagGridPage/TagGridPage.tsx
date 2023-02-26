import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import PreviewCard from 'components/PreviewCard/PreviewCard';

import { ListPageItemFragment } from 'types/queries';

interface TagGridPageProps {
  tags: (ListPageItemFragment | null)[];
}

const TagGridPage = ({ tags }: TagGridPageProps) =>
  tags && tags.length > 0 ? (
    <Container className="page tagGrid" data-testd="TagGrid">
      <Typography variant="h1">Tag Collections</Typography>
      <Typography variant="subtitle1" component="h2">
        {tags && `${tags.length} Tags`}
      </Typography>

      {tags.map((tag) => {
        const { slug, title, linkedFrom } = tag ?? {};

        const { recipeCollection } = linkedFrom ?? {};
        const { items } = recipeCollection ?? {};

        return slug && title && recipeCollection ? (
          <Box key={slug}>
            <Typography variant="h2" mb={2}>
              {title}
            </Typography>

            <Grid container spacing={2} mb={4}>
              {items &&
                items.map((recipe, index) => (
                  <Grid item lg={4} md={6} sm={12} xs={12} key={recipe?.slug}>
                    {recipe && (
                      <PreviewCard recipe={recipe} preloadImg={index < 2} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : null;
      })}
    </Container>
  ) : null;

export default TagGridPage;
