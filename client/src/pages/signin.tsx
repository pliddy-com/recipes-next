import { ReactElement, Suspense } from 'react';
import dynamic from 'next/dynamic';

import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

import config from 'lib/config';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

const SignInForm = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SignInForm' */ 'components/SignInForm/SignInForm'
    ),
  { suspense: true }
);

const SignInPage = () => {
  const { defaultTitle, description } = config?.microcopy?.signIn ?? {};

  return defaultTitle && description ? (
    <Container className="page recipegrid" data-testid="page" maxWidth="xl">
      <PageTags
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      <Typography variant="h1">{defaultTitle}</Typography>

      <Container maxWidth="xs">
        <SignInForm />
      </Container>
    </Container>
  ) : null;
};

SignInPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default SignInPage;
