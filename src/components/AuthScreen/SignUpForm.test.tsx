import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { act, cleanup, render, fireEvent, wait, waitForElement } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { SignUpDocument } from '../../graphql/types';
import { mockApolloClient } from '../../test-helpers';

describe('SignUpForm', () => {
  afterEach(cleanup);

  it('enables sign-up button when filled in', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient();

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignUpForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const nameInput = await waitForElement(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitForElement(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitForElement(() =>
      getByTestId('sign-up-button') as HTMLButtonElement
    );

    expect(signUpButton.disabled).toEqual(true);

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(nameInput.value).toEqual('User Name')
    );

    await wait(() =>
      expect(usernameInput.value).toEqual('username')
    );

    await wait(() =>
      expect(passwordInput.value).toEqual('password')
    );

    await wait(() =>
      expect(passwordConfirmInput.value).toEqual('password')
    );

    await wait(() =>
      expect(signUpButton.disabled).toEqual(false)
    )
  });

  it('prints server error if input was wrong', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignUpDocument,
          variables: {
            name: 'User Name',
            username: 'username',
            password: 'password',
            passwordConfirm: 'password'
          }
        },
        get result() { throw Error('sign-up failed') }
      }
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignUpForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const nameInput = await waitForElement(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitForElement(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitForElement(() =>
      getByTestId('sign-up-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(nameInput.value).toEqual('User Name')
    );

    await wait(() =>
      expect(usernameInput.value).toEqual('username')
    );

    await wait(() =>
      expect(passwordInput.value).toEqual('password')
    );

    await wait(() =>
      expect(passwordConfirmInput.value).toEqual('password')
    );

    act(() => {
      fireEvent.click(signUpButton);
    });

    const errorMessage = await waitForElement(() =>
      getByTestId('error-message')
    );

    await wait(() =>expect(errorMessage.innerHTML).toContain('sign-up failed'));
  });

  it('navigates to /sign-in if everything went right', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignUpDocument,
          variables: {
            name: 'User Name',
            username: 'username',
            password: 'password',
            passwordConfirm: 'password'
          }
        },
        result: { data: {} }
      }
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignUpForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const nameInput = await waitForElement(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitForElement(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitForElement(() =>
      getByTestId('sign-up-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await wait(() =>
      expect(nameInput.value).toEqual('User Name')
    );

    await wait(() =>
      expect(usernameInput.value).toEqual('username')
    );

    await wait(() =>
      expect(passwordInput.value).toEqual('password')
    );

    await wait(() =>
      expect(passwordConfirmInput.value).toEqual('password')
    );

    act(() => {
      fireEvent.click(signUpButton);
    });

    await wait(() =>
      expect(history.location.pathname).toEqual('/sign-in')
    );
  });
});