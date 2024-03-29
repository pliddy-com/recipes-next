import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';

import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';
import RecipeListSchema from 'components/PageHead/Schema/RecipeListSchema/RecipeListSchema';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const RecipeGridLayout = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeGrid' */ 'layout/RecipeGridLayout/RecipeGridLayout'
    ),
  { suspense: true }
);

const IndexPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.index ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageTags
        defaultTitle={defaultTitle}
        description={description}
        title={defaultTitle}
      />
      <RecipeListSchema
        description={description}
        recipes={pageContent}
        title={defaultTitle}
      />
      <Suspense fallback={<Loading />}>
        <RecipeGridLayout
          isIndex={true}
          recipes={pageContent}
          title={defaultTitle}
        />
      </Suspense>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return {
    props: {
      pageContent,
      preview
    },
    revalidate: 10
  };
};

IndexPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default IndexPage;
