/* istanbul ignore file */

import { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
// import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';

import { AuthenticationContext } from 'contexts/Authentication';

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
// import { signIn } from 'lib/auth';

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

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { isAuth, signIn } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAuth) router.push('/');
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (email && password) {
      // TODO: use next router & return to previous page
      try {
        // TODO: move this to use state & set up useEffect to wait for
        // state update before navigating to page
        await signIn({ email, password });
      } catch (e) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
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
          <form method="POST">
            <FormControl>
              <TextField
                error={emailError}
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                size="small"
                type="email"
                value={email}
              />

              <TextField
                error={passwordError}
                id="password"
                label="Password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                type="password"
                value={password}
              />

              <Button
                className="submit"
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
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
