import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Layout from 'layout/layout';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';
import RecipeGrid from 'pageContainers/RecipeGrid/RecipeGrid';

import { getTagSlugs, getRecipeList } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/typeUtils';

const TagPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const content = pageContent?.linkedFrom?.recipeCollection?.items ?? [];
  const { defaultDescription, defaultTitle } = config?.microcopy?.tag ?? {};

  const description = `${defaultDescription} ${title}`;

  const pageTitle = `${title} ${defaultTitle}`;

  return pageContent && title ? (
    <>
      <PageHeadTag
        title={`${title} ${defaultTitle}`}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeGrid recipes={content} title={pageTitle} />
      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await getTagSlugs({
    where: { slug_not: 'error' },
  });

  const paths = slugQueryResults
    .map((slug) => slug)
    .filter(hasValue)
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

  const [pageContent] = await getRecipeList({
    where: { slug },
  });

  // return { props: { pageContent, preview: Boolean(preview) } };
  return {
    props: { pageContent, preview: Boolean(preview) },
    revalidate: 60,
  };
};

TagPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default TagPage;
