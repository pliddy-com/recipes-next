/* istanbul ignore file */

import { ReactElement, Suspense, useState } from 'react';
// import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading/Loading';
import PageTags from 'components/PageHead/PageTags/PageTags';

// import { getRecipeIndex } from 'lib/api';
import config from 'lib/config';

import Button from '@mui/material/Button';
import Container from '@mui/system/Container';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Layout = dynamic(
  () => import(/* webpackChunkName: 'Layout' */ 'layout/Layout/Layout'),
  { suspense: true }
);

// const RecipeGridPage = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'RecipeGrid' */ 'layout/RecipeGridPage/RecipeGridPage'
//     ),
//   { suspense: true }
// );

const SignInPage = () => {
  const { defaultTitle, description } = config?.microcopy?.signIn ?? {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submit', { email, password });
  };

  return defaultTitle && description ? (
    <>
      <PageTags
        title={defaultTitle}
        defaultTitle={defaultTitle}
        description={description}
      />
      {/* {pageContent && pageContent.length > 0 && RecipeGridPage && (
        <Suspense fallback={<Loading />}>
          <RecipeGridPage recipes={pageContent} title={defaultTitle} />
        </Suspense>
      )} */}
      <Container className="page recipegrid" data-testid="page" maxWidth="xl">
        <Typography variant="h1">{defaultTitle}</Typography>

        <Container maxWidth="xs">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
              <TextField
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                size="small"
                type="email"
                value={email}
              />

              <TextField
                id="password"
                label="Password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                type="password"
                value={password}
              />

              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                sx={{ marginTop: '1rem', padding: '.75rem' }}
              >
                Sign In
              </Button>
            </FormControl>
          </form>
        </Container>
      </Container>
    </>
  ) : null;
};

// export const getStaticProps = async ({ preview = false }) => {
//   const pageContent = await getRecipeIndex();

//   return { props: { pageContent, preview }, revalidate: 60 };
// };

SignInPage.getLayout = (page: ReactElement) => (
  <Suspense fallback={<Loading />}>
    <Layout>{page}</Layout>
  </Suspense>
);

export default SignInPage;
