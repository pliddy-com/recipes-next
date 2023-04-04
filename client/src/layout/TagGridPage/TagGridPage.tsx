import { Suspense } from 'react';

import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import Loading from 'components/Loading/Loading';

import { ListPageItemFragment } from 'types/queries';

const PreviewCard = dynamic(
  () =>
    import(
      /* webpackChunkName: 'PreviewCard' */ 'components/PreviewCard/PreviewCard'
    ),
  { suspense: true }
);

interface TagGridPageProps {
  tags: (ListPageItemFragment | null)[];
}

const TagGridPage = ({ tags }: TagGridPageProps) => {
  // const { query } = useRouter();
  // const [scrollPage, setScrollPage] = useState<string | string[] | undefined>();

  return tags && tags.length > 0 ? (
    <Container className="page tagGrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">Tag Collections</Typography>
      <Typography variant="subtitle1" component="h2">
        {tags && `${tags.length} Tags`}
      </Typography>

      {tags.map((tag) => {
        const { slug, title, linkedFrom } = tag ?? {};

        const { recipeCollection } = linkedFrom ?? {};
        const { items } = recipeCollection ?? {};

        items &&
          items.sort((a, b) =>
            a && b && a.slug && b.slug && a.slug > b.slug ? 1 : -1
          );

        return slug && title && items ? (
          <Box key={slug}>
            <Link href={`/tags/${slug}`} underline="none" variant="h2">
              {title} <ArrowRightIcon />
            </Link>
            <Grid container spacing={2} mb={4}>
              {items &&
                items.map((recipe, index) => (
                  <Grid item lg={3} md={6} sm={12} xs={12} key={recipe?.slug}>
                    {recipe && (
                      <Suspense fallback={<Loading />}>
                        <PreviewCard recipe={recipe} preloadImg={index < 2} />
                      </Suspense>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : null;
      })}
    </Container>
  ) : null;
};

export default TagGridPage;
