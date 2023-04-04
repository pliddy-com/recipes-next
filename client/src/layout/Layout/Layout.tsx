import { ReactElement } from 'react';

import NavBar from 'components/Navigation/NavBar/NavBar';

import { TaxonomyChildrenItem } from 'types/queries';

import navData from 'data/navData.json';

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

export interface NavDataProps {
  categories: TaxonomyChildrenItem[];
  cuisine: TaxonomyChildrenItem[];
  tags: TaxonomyChildrenItem[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {navData && <NavBar nav={navData as unknown as NavDataProps} />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
