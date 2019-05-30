import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { cleanup, render, fireEvent, wait, waitForElement } from '@testing-library/react';
import SignInForm from './SignInForm';
import { SignInDocument } from '../../graphql/types';
import { mockApolloClient } from '../../test-helpers';

describe('SignInForm', () => {
  afterEach(cleanup);

  it('enables sign-in button when filled in', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient();

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      );
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const signInButton = getByTestId('sign-in-button') as HTMLButtonElement;

      expect(signInButton.disabled).toEqual(true);

      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);

      expect(signInButton.disabled).toEqual(false);
    }
  });

  it('prints server error if input was wrong', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignInDocument,
          variables: {
            username: 'username',
            password: 'password'
          }
        },
        get result() { throw Error('sign-in failed') },
      }
    ]);

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      );
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const signInButton = getByTestId('sign-in-button') as HTMLButtonElement;
      const errorMessage = getByTestId('error-message');

      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);

      fireEvent.click(signInButton);

      await waitForElement(() => errorMessage);

      expect(errorMessage.innerHTML).toContain('sign-in failed');
    }
  });

  it('navigates to /chats if everything went right', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignInDocument,
          variables: {
            username: 'username',
            password: 'password'
          }
        },
        result: { data: {} }
      }
    ]);

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      );
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const signInButton = getByTestId('sign-in-button') as HTMLButtonElement;

      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);

      fireEvent.click(signInButton);

      await wait(() =>
        expect(history.location.pathname).toEqual('/chats')
      );
    }
  });
});