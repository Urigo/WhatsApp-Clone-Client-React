import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  act,
  cleanup,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
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

    const nameInput = await waitFor(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitFor(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitFor(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitFor(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitFor(
      () => getByTestId('sign-up-button') as HTMLButtonElement
    );

    expect(signUpButton.disabled).toEqual(true);

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(nameInput.value).toEqual('User Name'));

    await waitFor(() => expect(usernameInput.value).toEqual('username'));

    await waitFor(() => expect(passwordInput.value).toEqual('password'));

    await waitFor(() => expect(passwordConfirmInput.value).toEqual('password'));

    await waitFor(() => expect(signUpButton.disabled).toEqual(false));
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
            passwordConfirm: 'password',
          },
        },
        get result() {
          throw Error('sign-up failed');
        },
      },
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignUpForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const nameInput = await waitFor(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitFor(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitFor(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitFor(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitFor(
      () => getByTestId('sign-up-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(nameInput.value).toEqual('User Name'));

    await waitFor(() => expect(usernameInput.value).toEqual('username'));

    await waitFor(() => expect(passwordInput.value).toEqual('password'));

    await waitFor(() => expect(passwordConfirmInput.value).toEqual('password'));

    act(() => {
      fireEvent.click(signUpButton);
    });

    const errorMessage = await waitFor(() => getByTestId('error-message'));

    await waitFor(() =>
      expect(errorMessage.innerHTML).toContain('sign-up failed')
    );
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
            passwordConfirm: 'password',
          },
        },
        result: { data: {} },
      },
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ApolloProvider client={client}>
          <SignUpForm history={history} />
        </ApolloProvider>
      ).getByTestId;
    });

    const nameInput = await waitFor(() =>
      getByTestId('name-input').querySelector('input')
    );
    const usernameInput = await waitFor(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitFor(() =>
      getByTestId('password-input').querySelector('input')
    );
    const passwordConfirmInput = await waitFor(() =>
      getByTestId('password-confirm-input').querySelector('input')
    );
    const signUpButton = await waitFor(
      () => getByTestId('sign-up-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(nameInput.value).toEqual('User Name'));

    await waitFor(() => expect(usernameInput.value).toEqual('username'));

    await waitFor(() => expect(passwordInput.value).toEqual('password'));

    await waitFor(() => expect(passwordConfirmInput.value).toEqual('password'));

    act(() => {
      fireEvent.click(signUpButton);
    });

    await waitFor(() => expect(history.location.pathname).toEqual('/sign-in'));
  });
});
