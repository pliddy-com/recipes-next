import { ReactElement, useEffect, useState } from 'react';

import Container from '@mui/material/Container';

import NavBar from 'components/Navigation/NavBar/NavBar';

import { getNavTaxonomy } from 'lib/api';

import { Taxonomy } from 'types/queries';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import PayloadRender from 'components/PayloadRender/PayloadRender';

// import baseTheme from 'theme/base';

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const [navData, setNavData] = useState<Taxonomy>();

  // const theme = useTheme();

  // const breakpoints = {
  //   xs: useMediaQuery(theme.breakpoints.only('xs')),
  //   sm: useMediaQuery(theme.breakpoints.only('sm')),
  //   md: useMediaQuery(theme.breakpoints.only('md')),
  //   lg: useMediaQuery(theme.breakpoints.only('lg')),
  //   xl: useMediaQuery(theme.breakpoints.only('xl')),
  // };

  // const { breakpoints: values } = baseTheme ?? {};

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
          {/* <PayloadRender payload={breakpoints} />
          <PayloadRender payload={values as object} /> */}
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;
