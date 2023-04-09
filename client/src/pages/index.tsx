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

const RecipeGridPage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeGrid' */ 'layout/RecipeGridPage/RecipeGridPage'
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
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeListSchema
        recipes={pageContent}
        title={defaultTitle}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <RecipeGridPage
          recipes={pageContent}
          title={defaultTitle}
          isIndex={true}
        />
      </Suspense>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

IndexPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default IndexPage;
