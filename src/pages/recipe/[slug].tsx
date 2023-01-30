import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Head from 'next/head';
import dynamic from 'next/dynamic';

import { queryPageSlugs, queryRecipeCollectionContent } from 'lib/api';

import Layout from '@/layout/Layout';
import Loading from '@/components/Loading/Loading';

import { notNullOrUndefined } from 'lib/typeUtils';

const Recipe = dynamic(
  import(/* webpackChunkName: 'Recipe' */ 'components/Recipe/Recipe'),
  { suspense: true }
);

const RecipePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};

  return (
    <>
      <Head>
        <title>{`Patrick's Recipes - ${title || 'Recipe'}`}</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <Recipe recipe={pageContent} />
      </Suspense>
    </>
    // <pre>{JSON.stringify(pageContent, null, 2)}</pre>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await queryPageSlugs({
    where: { slug_not: 'error' },
  });

  const paths = slugQueryResults
    .map(({ slug }) => slug)
    .filter(notNullOrUndefined)
    .map((slug) => ({
      params: { slug },
    }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { preview } = context;
  const slug = context.params?.slug;

  if (typeof slug !== 'string') {
    // TODO: Handle SSG errors
    throw new Error('Error in SSG!');
  }

  const [pageContent] = await queryRecipeCollectionContent({
    where: { slug },
  });

  return { props: { pageContent, preview: Boolean(preview) } };
};

RecipePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default RecipePage;
