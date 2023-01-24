import { ReactElement } from 'react';
import { InferGetStaticPropsType } from 'next';
// import dynamic from 'next/dynamic';
import { queryRecipeCollectionContent } from 'lib/api';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Layout from '@/layout/layout';
// import Loading from 'components/Loading';
import RecipeGrid from '@/components/RecipeGrid/RecipeGrid';

const HomePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container className="main" component="main">
      <Typography variant="h1">All My Recipes</Typography>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        {pageContent && `${pageContent?.length} Total`}
      </Typography>

      <RecipeGrid recipes={pageContent} />
      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </Container>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await queryRecipeCollectionContent();

  return { props: { pageContent, preview } };
};

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default HomePage;
