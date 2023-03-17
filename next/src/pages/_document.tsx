/* istanbul ignore file */
import * as React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import createEmotionCache from 'lib/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';

import FaviconTags from 'components/PageHead/FaviconTags/FaviconTags';
import FontPreloadTags from 'components/PageHead/FontPreloadTags/FontPreloadTags';

// TODO: test render of main against snapshot for head content

export default class MainDocument extends Document {
  static getInitialProps = (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> => Document.getInitialProps(ctx);

  render() {
    return (
      <Html lang="en">
        <Head>
          <FontPreloadTags />
          <FaviconTags />
        </Head>
        <body>
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
        <App emotionCache={cache} {...props} />
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
      ...emotionStyleTags
    ]
  };
};