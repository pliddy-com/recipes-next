import { ReactElement, Suspense, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';
import { useContentManagementContext } from 'contexts/Content';

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

const NotFoundPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setSupressEdit } = useContentManagementContext();

  const { defaultTitle, description } = config?.microcopy?.notFound ?? {};

  useEffect(() => {
    setSupressEdit(true);

    return () => setSupressEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return defaultTitle && description ? (
    <>
      <PageTags
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      {pageContent && pageContent.length > 0 && RecipeGridLayout && (
        <Suspense fallback={<Loading />}>
          <RecipeGridLayout recipes={pageContent} title={defaultTitle} />
        </Suspense>
      )}
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return {
    props: {
      pageContent,
      preview
    }
  };
};

NotFoundPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default NotFoundPage;
