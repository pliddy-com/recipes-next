import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import dynamic from 'next/dynamic';

import { queryPageSlugs, queryRecipeContent } from 'lib/api';

import Layout from 'layout/layout';
import Loading from 'components/Loading/Loading';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';

import { notNullOrUndefined } from 'lib/typeUtils';

import config from 'lib/config';

const Recipe = dynamic(
  import(/* webpackChunkName: 'Recipe' */ 'pageContainers/Recipe/Recipe'),
  { suspense: true }
);

const RecipePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { abstract, title } = pageContent ?? {};
  const { defaultDescription, defaultTitle } = config?.microcopy?.recipe ?? {};

  const description = abstract || `${defaultDescription} ${title}`;

  return (
    <>
      <PageHeadTag
        title={title}
        defaultTitle={defaultTitle}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <Recipe content={pageContent} />
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

  const [pageContent] = await queryRecipeContent({
    where: { slug },
  });

  return { props: { pageContent, preview: Boolean(preview) } };
};

RecipePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default RecipePage;
