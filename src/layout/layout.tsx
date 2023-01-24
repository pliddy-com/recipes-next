import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';

import NavBar from 'components/NavBar/NavBar';

import { queryNavContent } from 'lib/api';

import { Taxonomy } from 'types/generated/graphql';

type LayoutProps = {
  children?: ReactElement[] | ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const [navData, setNavData] = useState<Taxonomy>();

  useEffect(() => {
    queryNavContent({ where: { slug: 'categories' } })
      .then((result) => {
        const menu = result[0] as Taxonomy;
        setNavData(menu);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }, [setNavData]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Patrick's personal recipe collection"
        />
      </Head>
      <NavBar nav={navData} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
