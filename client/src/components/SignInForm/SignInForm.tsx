/* istanbul ignore file */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useAuthContext } from 'contexts/Authentication';

const SignInForm = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { isAuth, signIn } = useAuthContext();

  useEffect(() => {
    if (isAuth) push('/');
  }, [isAuth, push]);

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
      try {
        await signIn({ email, password });
      } catch (e) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <form method="POST" data-testid="signInForm">
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
  );
};

export default SignInForm;
