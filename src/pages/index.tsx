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

const IndexPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.index ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageHead
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      {RecipeGridPage && (
        <Suspense fallback={<Loading />}>
          <RecipeGridPage recipes={pageContent} title={defaultTitle} />
        </Suspense>
      )}

      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

IndexPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default IndexPage;
