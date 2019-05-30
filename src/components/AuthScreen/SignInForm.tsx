import React from 'react';
import { useCallback, useState } from 'react';
import { signIn } from '../../services/auth.service';
import {
  SignForm,
  ActualForm,
  Legend,
  Section,
  TextField,
  Button,
  ErrorMessage,
} from './form-components';
import { RouteComponentProps } from 'react-router-dom';

const SignInForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onUsernameChange = useCallback(({ target }) => {
    setError('');
    setUsername(target.value);
  }, []);

  const onPasswordChange = useCallback(({ target }) => {
    setError('');
    setPassword(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!(username && password);
  }, [username, password]);

  const handleSignIn = useCallback(() => {
    signIn({ username, password })
      .then(() => {
        history.replace('/chats')
      })
      .catch(error => {
        setError(error.message || error)
      });
  }, [username, password, history]);

  return (
    <SignForm>
      <ActualForm>
        <Legend>Sign in</Legend>
        <Section style={{ width: '100%' }}>
          <TextField
            data-testid="username-input"
            label="Username"
            value={username}
            onChange={onUsernameChange}
            margin="normal"
            placeholder="Enter your username"
          />
          <TextField
            data-testid="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            margin="normal"
            placeholder="Enter your password"
          />
        </Section>
        <Button
          data-testid="sign-in-button"
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignIn()}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
      </ActualForm>
    </SignForm>
  );
};

export default SignInForm;
