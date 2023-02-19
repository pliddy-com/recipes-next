import { ReactElement } from 'react';
import { InferGetStaticPropsType } from 'next';

import Layout from 'layout/layout';
import RecipeGrid from 'pageContainers/RecipeGrid/RecipeGrid';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';

const HomePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.index ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageHeadTag
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeGrid recipes={pageContent} title={defaultTitle} />
      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default HomePage;
