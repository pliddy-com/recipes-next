import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Head from 'next/head';

import { queryPageSlugs, queryRecipeCollectionContent } from 'lib/api';

import Layout from '@/layout/layout';
import { notNullOrUndefined } from 'lib/typeUtils';

import Recipe from 'components/Recipe/Recipe';

const RecipePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  return (
    <>
      <Head>
        <title>Patrick's Recipes | {title || 'Recipe'}</title>
      </Head>
      <Recipe recipe={pageContent} />
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
