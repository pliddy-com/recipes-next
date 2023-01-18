// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import createEmotionCache from 'lib/createEmotionCache';
import theme from 'theme';

// TODO: fix issue with default styling on Next Link
import 'styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppLayoutProps = AppProps & {
  emotionCache: EmotionCache;
  Component: NextPageWithLayout;
};

const MyApp = (props: AppLayoutProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props ?? {};

  // const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        {/* {getLayout(<Component {...pageProps} />)} */}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
