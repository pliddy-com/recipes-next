import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Grid from '@mui/material/Grid';

import Loading from 'components/Loading/Loading';

import { RecipeDefaultFragment } from 'types/queries';

const RecipeCard = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeCard' */ 'components/RecipeCard/RecipeCard'
    ),
  { suspense: true }
);

interface ResultsPageProps {
  data: (RecipeDefaultFragment | null)[];
  pageNum: number;
  numPages: number;
}

const ResultsPage = ({ data, pageNum, numPages }: ResultsPageProps) => {
  return (
    <>
      <Grid container spacing={2} data-testid="results-page">
        {data &&
          data.map((recipe, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={recipe?.slug}>
              <Suspense fallback={<Loading />}>
                {recipe && (
                  <RecipeCard recipe={recipe} preloadImg={index < 3} />
                )}
              </Suspense>
            </Grid>
          ))}
      </Grid>
      {pageNum < numPages - 1 && (
        <Link
          href={`/?page=${pageNum && pageNum > 0 ? pageNum + 1 : 2}`}
          style={{ display: 'flex', height: '1rem', visibility: 'hidden' }}
        >
          Load More
        </Link>
      )}
    </>
  );
};

export default ResultsPage;
