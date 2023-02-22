import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Layout from 'layout/Layout/Layout';
import PageHead from 'components/PageHead/PageTags/PageTags';
import RecipeGridPage from 'layout/RecipeGridPage/RecipeGridPage';

import { getTagSlugs, getRecipeList } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/typeUtils';

const TagSlugPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const content = pageContent?.linkedFrom?.recipeCollection?.items ?? [];
  const { defaultDescription, defaultTitle } = config?.microcopy?.tag ?? {};

  const description = `${defaultDescription} ${title}`;

  const pageTitle = `${title} ${defaultTitle}`;

  return pageContent && title ? (
    <>
      <PageHead
        title={`${title} ${defaultTitle}`}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeGridPage recipes={content} title={pageTitle} />
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
    throw new Error('Error in SSG. The slug property is not a string.');
  }

  const [pageContent] = await getRecipeList({
    where: { slug },
  });

  return {
    props: { pageContent, preview: Boolean(preview) },
    revalidate: 60,
  };
};

TagSlugPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default TagSlugPage;
