import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import PreviewCard from 'components/PreviewCard/PreviewCard';

import { ListPageItemFragment } from 'types/queries';

interface PagedTagsProps {
  data: (ListPageItemFragment | null)[];
  hideLinks: boolean;
  numPages: number;
  pageNum: number;
  isIndex?: boolean;
}

const PagedTags = (props: PagedTagsProps) => {
  const { data, hideLinks, isIndex = false, numPages, pageNum } = props;

  return data && data.length > 0 ? (
    <Box data-testid="results-page">
      {data.map((tag) => {
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
                      // <Suspense fallback={<Loading />}>
                      <PreviewCard recipe={recipe} preloadImg={index < 2} />
                      // </Suspense>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : null;
      })}
      {Boolean(isIndex || pageNum) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            height: hideLinks ? 0 : 'auto',
            visibility: hideLinks ? 'hidden' : 'visible'
          }}
        >
          {pageNum > 1 && (
            <Button
              component={Link}
              href={`./${pageNum - 1}`}
              startIcon={<NavigateBeforeIcon />}
              variant="text"
            >
              Load Previous
            </Button>
          )}

          {pageNum < numPages && (
            <Button
              component={Link}
              endIcon={<NavigateNextIcon />}
              href={pageNum > 1 ? `./${pageNum + 1}` : '/tags/page/2'}
              variant="text"
              sx={{ marginLeft: 'auto' }}
            >
              Load Next
            </Button>
          )}
        </Box>
      )}
    </Box>
  ) : null;
};

export default PagedTags;
