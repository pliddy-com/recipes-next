import { ReactElement } from 'react';
import Head from 'next/head';

// import Header from 'layout/components/Header/Header';

// import { getNavContent } from 'lib/api';

// import {
//   Maybe,
//   // Menu
// } from 'types/generated/graphql';

type LayoutProps = {
  children?: ReactElement[] | ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  //   const [navData, setNavData] = useState<Maybe<Menu>>();

  //   useEffect(() => {
  //     getNavContent()
  //       .then((result) => {
  //         const menu = result?.items[0];
  //         setNavData(menu);
  //       })
  //       // eslint-disable-next-line no-console
  //       .catch((e) => console.error(e));
  //   }, [setNavData]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Patrick's personal recipe collection"
        />
      </Head>
      {/* <Header navData={navData} /> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
