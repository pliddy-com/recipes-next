import { ReactElement, Suspense } from 'react';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';

import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';
import RecipeListSchema from 'components/PageHead/Schema/RecipeListSchema/RecipeListSchema';

import { getRecipeIndex } from 'lib/api';
import { paginateResults } from 'lib/infiniteScroll';

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

const RecipeListPage = ({
  pageContent,
  page
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.index ?? {};

  const title = `${defaultTitle} (Page ${page})`;

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageTags
        {...(page === 1 ? { canonicalPath: '/' } : {})}
        defaultTitle={defaultTitle}
        description={description}
        title={title}
      />
      <RecipeListSchema
        recipes={pageContent}
        title={title}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <RecipeGridPage recipes={pageContent} title={title} page={page} />
      </Suspense>
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipeList = await getRecipeIndex();
  const pageSize = 6;

  const pages = paginateResults({ data: recipeList, pageSize });

  const paths = pages
    .map((page, pageNum) => pageNum)
    .map((pageNum) => ({
      params: { page: String(pageNum + 1) }
    }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, preview } = context;
  const page = params?.page ? Number(params.page) : undefined;
  const pageContent = await getRecipeIndex();

  console.log({ page });

  return {
    props: { pageContent, page, preview: Boolean(preview) },
    revalidate: 60
  };
};

RecipeListPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default RecipeListPage;
