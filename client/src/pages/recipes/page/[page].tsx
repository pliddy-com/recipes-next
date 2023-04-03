import { ReactElement, Suspense } from 'react';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';

import dynamic from 'next/dynamic';

import Layout from 'layout/Layout/Layout';

import Loading from 'components/Loading/Loading';
import PageHead from 'components/PageHead/PageTags/PageTags';
import RecipeListSchema from 'components/PageHead/Schema/RecipeListSchema/RecipeListSchema';

import { getRecipeIndex } from 'lib/api';
import { paginateResults } from 'lib/infiniteScroll';

import config from 'lib/config';

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
      <PageHead
        title={title}
        defaultTitle={defaultTitle}
        description={description}
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

  return {
    props: { pageContent, page, preview: Boolean(preview) },
    revalidate: 60
  };
};

RecipeListPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default RecipeListPage;
