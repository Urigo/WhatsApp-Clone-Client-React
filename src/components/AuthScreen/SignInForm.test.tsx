import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { act, cleanup, render, fireEvent, wait, waitForElement } from '@testing-library/react';
import SignInForm from './SignInForm';
import { SignInDocument } from '../../graphql/types';
import { mockApolloClient } from '../../test-helpers';

describe('SignInForm', () => {
  afterEach(cleanup);

  it('enables sign-in button when filled in', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient();

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const signInButton = await waitForElement(() =>
      getByTestId('sign-in-button') as HTMLButtonElement
    );
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );

    expect(signInButton.disabled).toEqual(true);

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(signInButton.disabled).toEqual(false)
    )
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

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const signInButton = await waitForElement(() =>
      getByTestId('sign-in-button') as HTMLButtonElement
    );
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(usernameInput.value).toEqual('username')
    );

    await wait(() =>
      expect(passwordInput.value).toEqual('password')
    );

    act(() => {
      fireEvent.click(signInButton);
    });

    const errorMessage = await waitForElement(() =>
      getByTestId('error-message')
    );

    await wait(() => expect(errorMessage.innerHTML).toContain('sign-in failed'));
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

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignInForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    })

    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );
    const signInButton = await waitForElement(() =>
      getByTestId('sign-in-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(usernameInput.value).toEqual('username')
    );

    await wait(() =>
      expect(passwordInput.value).toEqual('password')
    );

    act(() => {
      fireEvent.click(signInButton);
    });

    await wait(() => expect(history.location.pathname).toEqual('/chats'));
  });
});