import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useAuthContext } from 'contexts/Authentication';

import Loading from 'components/Loading/Loading';

const SignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { isAuth, isLoading, setIsLoading, signIn } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      router.push(document.referrer);
      /* istanbul ignore next */
      router.events.on('routeChangeComplete', () => setIsLoading(false));
    }

    /* unsubscribe from event when component dismounts*/
    /* istanbul ignore next */
    return () => {
      router.events.off('routeChangeComplete', () => void 0);
    };
  }, [isAuth, router, setIsLoading]);

  const handleSubmit = async (event: SyntheticEvent) => {
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
      try {
        await signIn({ email, password });
      } catch (e) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return isLoading ? (
    <Loading className="signInLoading" />
  ) : (
    <form method="POST" data-testid="signInForm">
      <FormControl className="signin">
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
          aria-label="submit"
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
  );
};

export default SignInForm;
