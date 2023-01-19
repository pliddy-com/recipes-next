import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { queryPageSlugs, queryRecipeCollectionContent } from 'lib/api';

import SiteLayout from 'layout/SiteLayout';
import { notNullOrUndefined } from 'lib/typeUtils';

import Container from '@mui/material/Container';

const RecipePage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  //   <Content contentData={pageContent} />
  <pre>{JSON.stringify(pageContent, null, 2)}</pre>
);

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
    // TODO: Better handling of this situation. What do we do?
    throw new Error('Error in SSG!');
  }

  const [pageContent] = await queryRecipeCollectionContent({
    where: { slug },
  });

  return { props: { pageContent, preview: Boolean(preview) } };
};

RecipePage.getLayout = (page: ReactElement) => <SiteLayout>{page}</SiteLayout>;

export default RecipePage;
