import { ReactElement, useEffect, useState } from 'react';

import NavBar from '@/components/NavBar/NavBar';

import { queryNavContent } from 'lib/api';

import { Taxonomy } from 'types/generated/graphql';

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const [navData, setNavData] = useState<Taxonomy>();

  useEffect(() => {
    queryNavContent({ where: { slug: 'categories' } })
      .then((result) => {
        if (result[0]) {
          const menu = result[0] as Taxonomy;
          setNavData(menu);
        }
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }, [setNavData]);

  return (
    <>
      <NavBar nav={navData} />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
