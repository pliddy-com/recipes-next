import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Layout from 'layout/Layout/Layout';
import PageHead from 'components/PageHead/PageTags/PageTags';
import Recipe from 'layout/RecipePage/RecipePage';

import { getRecipeSlugs, getRecipePage } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/typeUtils';

const RecipeSlugPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { abstract, title, image } = pageContent ?? {};
  const { defaultDescription, defaultTitle } = config?.microcopy?.recipe ?? {};

  const description = abstract || `${defaultDescription} ${title}`;

  return pageContent && title && description && defaultTitle ? (
    <>
      <PageHead
        title={title}
        defaultTitle={defaultTitle}
        description={description}
        image={image}
      />
      <Recipe content={pageContent} />
      {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
    </>
  ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugQueryResults = await getRecipeSlugs({
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

  const [pageContent] = await getRecipePage({
    where: { slug },
  });

  return {
    props: { pageContent, preview: Boolean(preview) },
    revalidate: 60,
  };
};

RecipeSlugPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default RecipeSlugPage;
