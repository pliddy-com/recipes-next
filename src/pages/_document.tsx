/* istanbul ignore file */
import * as React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import createEmotionCache from 'lib/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';

import { regularSansFontPath, regularSerifFontPath } from 'theme/fontface';

import { background } from 'lib/styles';
import colors from 'theme/colors';

// TODO: test render of main against snapshot for head content

export default class MainDocument extends Document {
  static getInitialProps = (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> => Document.getInitialProps(ctx);

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href={regularSansFontPath}
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={regularSerifFontPath}
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png?v=1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png?v=1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png?v=1"
          />
          <link rel="manifest" href="/site.webmanifest?v=1" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg?v=1"
            color={colors.primary.main}
          />
          <link rel="shortcut icon" href="/favicon.ico?v=1" />
          <meta name="msapplication-TileColor" content={colors.primary.main} />
          <meta name="theme-color" content={colors.primary.main} />
        </Head>

        <body style={background}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// use getInitialProps in _document, not _app`) for SSG

MainDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);

  // Prevents emotion rendering invalid HTML:
  // https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
