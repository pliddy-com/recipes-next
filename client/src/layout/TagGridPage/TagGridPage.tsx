// import { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// import Loading from 'components/Loading/Loading';
import PreviewCard from 'components/PreviewCard/PreviewCard';

import { ListPageItemFragment } from 'types/queries';

interface TagGridPageProps {
  tags: (ListPageItemFragment | null)[];
}

const TagGridPage = ({ tags }: TagGridPageProps) => {
  // const [data, setData] = useState<(ListPageItemFragment | null)[]>([]);

  // const numPreload = 3;
  // const scrollThreshold = 900;

  // useEffect(() => {
  //   if (tags) {
  //     const subset = tags.slice(0, numPreload);
  //     setData(subset);
  //   }
  // }, [tags]);

  /* istanbul ignore next */
  // const loadNext = () => setData(tags.slice(0, data.length + numPreload));

  return tags && tags.length > 0 ? (
    <Container className="page tagGrid" data-testid="page" maxWidth="xl">
      <Typography variant="h1">Tag Collections</Typography>
      <Typography variant="subtitle1" component="h2">
        {tags && `${tags.length} Tags`}
      </Typography>

      {/* <InfiniteScroll
        hasMore={data.length < tags.length}
        initialLoad={true}
        loader={<Loading key={`loading-${data.length}`} />}
        loadMore={loadNext}
        pageStart={0}
        threshold={scrollThreshold}
      > */}
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
            <Link href={`/tag/${slug}`} underline="none" variant="h2">
              {title} <ArrowRightIcon />
            </Link>
            <Grid container spacing={2} mb={4}>
              {items &&
                items.map((recipe, index) => (
                  <Grid item lg={3} md={6} sm={12} xs={12} key={recipe?.slug}>
                    {recipe && (
                      <PreviewCard recipe={recipe} preloadImg={index < 2} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : null;
      })}
      {/* </InfiniteScroll> */}
    </Container>
  ) : null;
};

export default TagGridPage;
