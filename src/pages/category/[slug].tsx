import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Layout from 'layout/layout';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';
import RecipeGrid from 'pageContainers/RecipeGrid/RecipeGrid';

import { queryCategorySlugs, queryListPageContent } from 'lib/api';
import config from 'lib/config';
import { notNullOrUndefined } from 'lib/typeUtils';

const CategoryPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const content = pageContent?.linkedFrom?.recipeCollection?.items ?? [];
  const { defaultDescription, defaultTitle } =
    config?.microcopy?.category ?? {};

  const description = `${defaultDescription} ${title}`;

  return (
    <>
      <PageHeadTag
        title={title}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeGrid recipes={content} title={title} />
      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await queryCategorySlugs({
    where: { slug: 'categories', slug_not: 'error' },
  });

  const paths = slugQueryResults
    .map((slug) => slug)
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

CategoryPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default CategoryPage;
