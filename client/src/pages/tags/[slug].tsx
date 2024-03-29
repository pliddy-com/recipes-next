import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';

import dynamic from 'next/dynamic';

import RecipeListSchema from 'components/PageHead/Schema/RecipeListSchema/RecipeListSchema';
import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

import { getTagSlugs, getRecipeList } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/utils';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const RecipeGridLayout = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipeGrid' */ 'layout/RecipeGridLayout/RecipeGridLayout'
    ),
  { suspense: true }
);

const TagSlugPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = pageContent ?? {};
  const content = pageContent?.linkedFrom?.recipeCollection?.items ?? [];
  const { defaultDescription, defaultTitle } = config?.microcopy?.tag ?? {};

  const description = `${defaultDescription} ${title}`;

  const pageTitle = `${title} ${defaultTitle}`;

  return pageContent && title ? (
    <>
      <PageTags
        title={`${title} ${defaultTitle}`}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeListSchema
        recipes={content}
        title={title}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <RecipeGridLayout recipes={content} title={pageTitle} />
      </Suspense>
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await getTagSlugs({
    where: { slug_not: 'error' }
  });

  const paths = slugQueryResults
    .map((slug) => slug)
    .filter(hasValue)
    .map((slug) => ({
      params: { slug }
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
    where: { slug }
  });

  return {
    props: {
      pageContent,
      preview: Boolean(preview)
    },
    revalidate: 10
  };
};

TagSlugPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default TagSlugPage;
