import { ReactElement, useEffect, useState } from 'react';

import NavBar from 'components/Navigation/NavBar/NavBar';

import { getNavTaxonomy } from 'lib/api';

import { TaxonomyChildrenItem } from 'types/queries';

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

interface NavDataProps {
  categories: TaxonomyChildrenItem[];
  cuisine: TaxonomyChildrenItem[];
  tags: TaxonomyChildrenItem[];
}

const Layout = ({ children }: LayoutProps) => {
  const [navData, setNavData] = useState<NavDataProps>();

  useEffect(() => {
    getNavTaxonomy()
      .then((nav) => {
        nav && setNavData(nav as NavDataProps);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }, [setNavData]);

  return (
    <>
      <NavBar nav={navData} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
