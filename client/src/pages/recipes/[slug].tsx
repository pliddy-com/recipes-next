import { ReactElement, Suspense } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';

import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';
import RecipeSchema from 'components/PageHead/Schema/RecipeSchema/RecipeSchema';

import { getRecipeSlugs, getRecipePage } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/utils';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const RecipePage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'RecipePage' */ 'layout/RecipeLayout/RecipeLayout'
    ),
  { suspense: true }
);

const RecipeSlugPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { recipe, categories, cuisine } = pageContent ?? {};
  const { abstract, title, image } = recipe ?? {};
  const { defaultDescription, defaultTitle } = config?.microcopy?.recipe ?? {};

  const description = abstract || `${defaultDescription} ${title}`;

  return recipe && title && description && defaultTitle ? (
    <>
      <PageTags
        title={title}
        defaultTitle={defaultTitle}
        description={description}
        image={image}
      />
      <RecipeSchema recipe={recipe} categories={categories} cuisine={cuisine} />
      <Suspense fallback={<Loading />}>
        <RecipePage content={recipe} />
      </Suspense>
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await getRecipeSlugs({
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

  const { recipe, categories, cuisine } = await getRecipePage({
    where: { slug }
  });

  const pageContent = { recipe, categories, cuisine };

  return {
    props: {
      pageContent,
      preview: Boolean(preview)
    },
    revalidate: 10
  };
};

RecipeSlugPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default RecipeSlugPage;
