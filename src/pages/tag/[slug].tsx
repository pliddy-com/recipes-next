import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Head from 'next/head';
import dynamic from 'next/dynamic';

import { queryTagSlugs, queryListPageContent } from 'lib/api';

import Layout from '@/layout/Layout';
import Loading from '@/components/Loading/Loading';

import { notNullOrUndefined } from 'lib/typeUtils';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const RecipeGrid = dynamic(
  import(/* webpackChunkName: 'TagGrid' */ 'components/RecipeGrid/RecipeGrid'),
  { suspense: true }
);

const TagPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const recipes = pageContent?.linkedFrom?.recipeCollection?.items ?? [];

  return (
    <>
      <Head>{<title>{`Patrick's Recipes - ${title}`}</title>}</Head>

      <Container className="main" component="main">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1" component="h2" gutterBottom>
          {pageContent &&
            `${pageContent?.linkedFrom?.recipeCollection?.items.length} Total`}
        </Typography>

        <Suspense fallback={<Loading />}>
          <RecipeGrid recipes={recipes} />
        </Suspense>

        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await queryTagSlugs({
    where: { slug_not: 'error' },
  });

  const paths = slugQueryResults
    .map((tag) => tag?.slug)
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

  const [pageContent] = await queryListPageContent({
    where: { slug },
  });

  return { props: { pageContent, preview: Boolean(preview) } };
};

TagPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default TagPage;
