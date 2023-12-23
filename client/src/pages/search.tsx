import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch';

import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const SearchGridLayout = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SearchGrid' */ 'layout/SearchGridLayout/SearchGridLayout'
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
      <Typography variant="h1" sx={{ visibility: 'hidden', height: 0 }}>
        {defaultTitle}
      </Typography>

      <InstantSearch
        future={{
          preserveSharedStateOnUnmount: false
        }}
        indexName="recipes_index"
        searchClient={searchClient}
      >
        <Configure hitsPerPage={100} />
        <Suspense fallback={<Loading />}>
          <SearchGridLayout title={defaultTitle} />
        </Suspense>
      </InstantSearch>
    </>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return {
    props: {
      pageContent,
      preview
    },
    revalidate: 10
  };
};

SearchPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default SearchPage;
