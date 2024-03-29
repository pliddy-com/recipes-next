import { MouseEventHandler, SyntheticEvent, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import Loading from 'components/Loading/Loading';

interface ISignInDialog {
  isLoading: boolean;
  isOpen: boolean;
  onClose: MouseEventHandler;
  onSignIn({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<void>;
}

const SignInDialog = ({
  isLoading,
  isOpen,
  onClose,
  onSignIn
}: ISignInDialog) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

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
        await onSignIn({ email, password });
        setEmail('');
        setPassword('');
      } catch (e) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="signInDialog"
      data-testid="signInDialog"
      maxWidth="sm"
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle variant="h2" id="modal-title">
        Sign In
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <DialogContentText id="modal-description" variant="body2">
              Enter an email and password.
            </DialogContentText>
            <TextField
              autoFocus
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          aria-label="cancel"
          className="submit"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          aria-label="submit"
          className="submit"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInDialog;
