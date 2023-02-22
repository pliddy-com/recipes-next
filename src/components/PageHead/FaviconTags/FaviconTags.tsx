import colors from 'theme/colors';

const FaviconTags = () => (
  <>
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
  </>
);

export default FaviconTags;
