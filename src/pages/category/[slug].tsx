import { ReactElement } from 'react';

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { queryCategorySlugs, queryListPageContent } from 'lib/api';

import SiteLayout from 'layout/SiteLayout';
import { notNullOrUndefined } from 'lib/typeUtils';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import RecipeGrid from '@/components/RecipeGrid/RecipeGrid';
import { RecipeDefaultFragment } from '@/types/generated/graphql';

const CategoryPage = ({
  pageContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Container className="main" component="main">
    <Typography variant="h1">All My Recipes</Typography>
    <Typography variant="subtitle1" component="h2" gutterBottom>
      {pageContent &&
        `${pageContent?.linkedFrom?.recipeCollection?.items.length} Total`}
    </Typography>

    <RecipeGrid
      recipes={
        pageContent?.linkedFrom?.recipeCollection
          ?.items as RecipeDefaultFragment[]
      }
    />
    {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
  </Container>
);

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

CategoryPage.getLayout = (page: ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);

export default CategoryPage;
