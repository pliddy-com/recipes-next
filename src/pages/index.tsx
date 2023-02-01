import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { queryRecipeCollectionContent } from 'lib/api';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Layout from '@/layout/Layout';
import Loading from '@/components/Loading/Loading';
import PageHeadTag from '@/components/PageHeadTag/PageHeadTag';

import config from '@/lib/config';

const RecipeGrid = dynamic(
  import(
    /* webpackChunkName: 'IndexGrid' */ 'components/RecipeGrid/RecipeGrid'
  ),
  { suspense: true }
);

const HomePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    microcopy: {
      index: { defaultTitle },
    },
  } = config;

  return (
    <>
      <PageHeadTag title={defaultTitle} defaultTitle={defaultTitle} />
      <Container>
        <Typography variant="h1">All Recipes</Typography>
        <Typography variant="subtitle1" component="h2" gutterBottom>
          {pageContent && `${pageContent?.length} Total`}
        </Typography>

        <Suspense fallback={<Loading />}>
          <RecipeGrid recipes={pageContent} />
        </Suspense>

        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </Container>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await queryRecipeCollectionContent();

  return { props: { pageContent, preview } };
};

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default HomePage;
