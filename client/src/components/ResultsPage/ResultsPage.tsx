import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/queries';
import Button from '@mui/material/Button';

interface ResultsPageProps {
  data: (RecipeDefaultFragment | null)[];
  hideLinks: boolean;
  numPages: number;
  pageNum: number;
  isIndex?: boolean;
}

const ResultsPage = (props: ResultsPageProps) => {
  const { data, hideLinks, isIndex = false, numPages, pageNum } = props;

  return (
    <>
      <Grid container spacing={2} data-testid="results-page">
        {data &&
          data.map((recipe, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
              {recipe && <RecipeCard recipe={recipe} preloadImg={index < 3} />}
            </Grid>
          ))}
      </Grid>
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
              href={`/page/${pageNum - 1}`}
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
              href={`/page/${pageNum + 1}`}
              variant="text"
              sx={{ marginLeft: 'auto' }}
            >
              Load Next
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default ResultsPage;
