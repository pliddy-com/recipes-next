import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RecipeCard from 'components/RecipeCard/RecipeCard';

import { ListPageItemFragment } from 'types/queries';

import { flex } from 'lib/styles';
// import PayloadRender from 'components/PayloadRender/PayloadRender';

interface TagGridPageProps {
  tags: (ListPageItemFragment | null)[];
}

const TagGridPage = ({ tags }: TagGridPageProps) =>
  tags ? (
    <Container className="page recipegrid" data-testd="TagGrid">
      <Typography variant="h1">Tag Collections</Typography>

      <Typography variant="subtitle1" component="h2">
        {tags && `${tags.length} Tags`}
      </Typography>

      {tags.map((tag) => {
        const { slug, title, linkedFrom } = tag ?? {};

        const { recipeCollection } = linkedFrom ?? {};
        const { items } = recipeCollection ?? {};

        return slug && title ? (
          <>
            <Typography variant="h2" key={slug}>
              {title}
            </Typography>

            <Grid container spacing={2}>
              {items &&
                items.map((recipe, index) => (
                  <Grid
                    item
                    md={6}
                    sm={6}
                    xs={12}
                    key={recipe?.slug}
                    sx={{ flex }}
                  >
                    {recipe && (
                      <RecipeCard recipe={recipe} preloadImg={index < 2} />
                      // <PayloadRender payload={recipe as unknown as JSON} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </>
        ) : null;
      })}
    </Container>
  ) : null;

export default TagGridPage;
