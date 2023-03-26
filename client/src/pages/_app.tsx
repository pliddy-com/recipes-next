/* istanbul ignore file */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';

import createEmotionCache from 'lib/createEmotionCache';
import theme from 'theme';
import Head from 'next/head';

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

interface AppLayoutProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPageWithLayout;
}

const MyApp = (props: AppLayoutProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props ?? {};

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <InstantSearch searchClient={searchClient} indexName="recipes_index">
        <Configure hitsPerPage={100} />
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </InstantSearch>
    </>
  );
};

export default MyApp;
