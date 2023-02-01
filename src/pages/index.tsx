import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { queryRecipeCollectionContent } from 'lib/api';

import Layout from 'layout/Layout';
import Loading from 'components/Loading/Loading';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';

import config from 'lib/config';

const RecipeGrid = dynamic(
  import(
    /* webpackChunkName: 'IndexGrid' */ 'components/RecipeGrid/RecipeGrid'
  ),
  { suspense: true }
);

const HomePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle } = config?.microcopy?.index ?? {};

  return (
    <>
      <PageHeadTag title={defaultTitle} defaultTitle={defaultTitle} />
      <Suspense fallback={<Loading />}>
        <RecipeGrid recipes={pageContent} title={defaultTitle} />
      </Suspense>

      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await queryRecipeCollectionContent();

  return { props: { pageContent, preview } };
};

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default HomePage;
