import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import dynamic from 'next/dynamic';

import { queryTagSlugs, queryListPageContent } from 'lib/api';

import Layout from 'layout/layout';
import Loading from 'components/Loading/Loading';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';

import { notNullOrUndefined } from 'lib/typeUtils';

import config from 'lib/config';

const RecipeGrid = dynamic(
  import(/* webpackChunkName: 'TagGrid' */ 'components/RecipeGrid/RecipeGrid'),
  { suspense: true }
);

const TagPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const content = pageContent?.linkedFrom?.recipeCollection?.items ?? [];
  const { defaultDescription, defaultTitle } = config?.microcopy?.tag ?? {};

  const description = `${defaultDescription} ${title}`;

  return (
    <>
      <PageHeadTag
        title={title}
        defaultTitle={defaultTitle}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <RecipeGrid recipes={content} title={title} />
      </Suspense>

      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
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
