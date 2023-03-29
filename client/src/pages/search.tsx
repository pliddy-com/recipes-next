import { ReactElement, Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';

import Layout from 'layout/Layout/Layout';
import Loading from 'components/Loading/Loading';
import PageHead from 'components/PageHead/PageTags/PageTags';

import { getRecipeIndex } from 'lib/api';

import config from 'lib/config';

const { NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY } =
  process.env;

const searchClient =
  NEXT_PUBLIC_ALGOLIA_APP_ID &&
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY &&
  algoliasearch(NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);

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
  const { defaultTitle, description } = config?.microcopy?.search ?? {};

  return searchClient && pageContent && pageContent.length > 0 ? (
    <InstantSearch searchClient={searchClient} indexName="recipes_index">
      <Configure hitsPerPage={100} />
      <PageHead
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <Suspense fallback={<Loading />}>
        <SearchGridPage title={defaultTitle} />
      </Suspense>
    </InstantSearch>
  ) : null;
};

export const getStaticProps = async ({ preview = false }) => {
  const pageContent = await getRecipeIndex();

  return { props: { pageContent, preview }, revalidate: 60 };
};

SearchPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SearchPage;
