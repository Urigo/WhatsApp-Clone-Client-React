import { createMemoryHistory } from 'history';
import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  wait,
  waitForElement,
  act
} from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  afterEach(cleanup);
  afterEach(() => fetch.resetMocks());

  it('enables sign-in button when filled in', async () => {
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(
        <SignInForm history={history} />
      );
      const usernameInput = getByTestId('username-input').querySelector(
        'input'
      );
      const passwordInput = getByTestId('password-input').querySelector(
        'input'
      );
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

    fetchMock.mockRejectOnce(new Error('sign-in failed'));
    let getByTestId: any = null;

    act(() => {
      getByTestId = render(<SignInForm history={history} />).getByTestId;
    });

    const signInButton = await waitForElement(
      () => getByTestId('sign-in-button') as HTMLButtonElement
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

    act(() => {
      fireEvent.click(signInButton);
    });

    const errorMessage = await waitForElement(() =>
      getByTestId('error-message')
    );

    expect(errorMessage.innerHTML).toContain('sign-in failed');
  });

  it('navigates to /chats if everything went right', async () => {
    const history = createMemoryHistory();

    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          signIn: {
            __typename: 'User',
            id: '1'
          }
        }
      })
    );

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(<SignInForm history={history} />).getByTestId;
    });
    const usernameInput = await waitForElement(() =>
      getByTestId('username-input').querySelector('input')
    );
    const passwordInput = await waitForElement(() =>
      getByTestId('password-input').querySelector('input')
    );
    const signInButton = await waitForElement(
      () => getByTestId('sign-in-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    act(() => {
      fireEvent.click(signInButton);
    });

    await wait(() => expect(history.location.pathname).toEqual('/chats'));
  });
});
