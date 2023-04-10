import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';

import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';

import config from 'lib/config';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const SearchGridPage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SearchGrid' */ 'layout/SearchGridPage/SearchGridPage'
    ),
  { suspense: true }
);

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

const SearchPage = ({
  pageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { defaultTitle, description } = config?.microcopy?.search ?? {};

  return pageContent && pageContent.length > 0 ? (
    <>
      <PageTags
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <>
        <Typography variant="h1">{defaultTitle}</Typography>
        <Typography variant="subtitle1" component="h2">
          {pageContent.length} Recipes
        </Typography>
      </>

      <InstantSearch searchClient={searchClient} indexName="recipes_index">
        <Configure hitsPerPage={100} />
        <Suspense fallback={<Loading />}>
          <SearchGridPage title={defaultTitle} />
        </Suspense>
      </InstantSearch>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

SearchPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default SearchPage;
