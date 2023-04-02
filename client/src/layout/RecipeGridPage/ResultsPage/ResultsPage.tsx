import Link from 'next/link';

import Grid from '@mui/material/Grid';

import RecipeCard from 'components/RecipeCard/RecipeCard';

import { RecipeDefaultFragment } from 'types/queries';

interface ResultsPageProps {
  data: (RecipeDefaultFragment | null)[];
  numPages: number;
  pageNum: number;
}

const ResultsPage = (props: ResultsPageProps) => {
  const { data, numPages, pageNum } = props;

  /**
   *  TODO: make styles visible if page
   */
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
      {pageNum > 1 && (
        <Link
          href={`/recipes/page/${pageNum - 1}`}
          // style={{ display: 'flex', height: '1rem', visibility: 'hidden' }}
        >
          Load Previous
        </Link>
      )}

      {pageNum < numPages && (
        <Link
          href={`/recipes/page/${pageNum + 1}`}
          // style={{ display: 'flex', height: '1rem', visibility: 'hidden' }}
        >
          Load Next
        </Link>
      )}
    </>
  );
};

export default ResultsPage;
