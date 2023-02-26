import { ReactElement, useEffect, useState } from 'react';

import Container from '@mui/material/Container';

import NavBar from 'components/Navigation/NavBar/NavBar';

import { getNavTaxonomy } from 'lib/api';

import { Taxonomy } from 'types/queries';

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const [navData, setNavData] = useState<Taxonomy>();

  useEffect(() => {
    getNavTaxonomy({ where: { slug: 'categories' } })
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
      <main>
        <Container className="page" data-testd="page" maxWidth="xl">
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;
