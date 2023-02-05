import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { queryRecipeCollectionContent } from 'lib/api';

import Layout from 'layout/layout';
import Loading from 'components/Loading/Loading';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';

import { microcopy } from 'lib/config';

const RecipeGrid = dynamic(
  import(
    /* webpackChunkName: 'IndexGrid' */ 'containers/RecipeGrid/RecipeGrid'
  ),
  { suspense: true }
);

const HomePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = microcopy?.index ?? {};

  return (
    <>
      <PageHeadTag
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
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
