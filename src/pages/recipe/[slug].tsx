import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import Layout from 'layout/layout';
import PageHeadTag from 'components/PageHeadTag/PageHeadTag';
import Recipe from 'pageContainers/Recipe/Recipe';

import { getRecipeSlugs, getRecipePage } from 'lib/api';
import config from 'lib/config';
import { hasValue } from 'lib/typeUtils';

const RecipePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { abstract, title, image } = pageContent ?? {};
  const { defaultDescription, defaultTitle } = config?.microcopy?.recipe ?? {};

  const description = abstract || `${defaultDescription} ${title}`;

  return pageContent && title && description && defaultTitle ? (
    <>
      <PageHeadTag
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
    // TODO: Handle SSG errors
    throw new Error('Error in SSG!');
  }

  const [pageContent] = await getRecipePage({
    where: { slug },
  });

  return {
    props: { pageContent, preview: Boolean(preview) },
    revalidate: 60,
  };
};

RecipePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default RecipePage;
