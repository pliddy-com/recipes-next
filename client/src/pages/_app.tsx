/* istanbul ignore file */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { AuthenticationProvider } from 'contexts/Authentication';

import createEmotionCache from 'lib/createEmotionCache';
import theme from 'theme';
import Head from 'next/head';

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppLayoutProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPageWithLayout;
}

const RecipesApp = (props: AppLayoutProps) => {
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
        <link rel="preconnect" href="https://images.ctfassets.net" />
      </Head>
      <AuthenticationProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </AuthenticationProvider>
    </>
  );
};

export default RecipesApp;
