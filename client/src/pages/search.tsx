import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Layout from 'layout/Layout/Layout';
import Loading from 'components/Loading/Loading';
import PageHead from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';
import RecipeListSchema from 'components/PageHead/Schema/RecipeListSchema/RecipeListSchema';

const SearchGridPage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SearchGrid' */ 'layout/SearchGridPage/SearchGridPage'
    ),
  { suspense: true }
);

const SearchPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.index ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageHead
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <RecipeListSchema
        recipes={pageContent}
        title={defaultTitle}
        description={description}
      />
      {SearchGridPage && (
        <Suspense fallback={<Loading />}>
          <SearchGridPage
            recipes={pageContent}
            title={defaultTitle}
            description={description}
          />
        </Suspense>
      )}
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

SearchPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SearchPage;
