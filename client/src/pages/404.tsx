import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Layout from 'layout/Layout/Layout';

import Loading from 'components/Loading/Loading';
import PageHead from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';

const RecipeGridPage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeGrid' */ 'layout/RecipeGridPage/RecipeGridPage'
    ),
  { suspense: true }
);

const NotFoundPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.notFound ?? {};

  return defaultTitle && description ? (
    <>
      <PageHead
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      {pageContent && pageContent.length > 0 && RecipeGridPage && (
        <Suspense fallback={<Loading />}>
          <RecipeGridPage recipes={pageContent} title={defaultTitle} />
        </Suspense>
      )}
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

NotFoundPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default NotFoundPage;
