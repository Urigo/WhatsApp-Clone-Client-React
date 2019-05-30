import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, wait, waitForElement } from 'react-testing-library';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  afterEach(cleanup);
  afterEach(() => fetch.resetMocks());

  it('enables sign-in button when filled in', async () => {
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(<SignInForm history={history} />);
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

    fetchMock.mockRejectOnce(new Error('sign-in failed'));

    {
      const { container, getByTestId } = render(<SignInForm history={history} />);
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

      expect(errorMessage.innerHTML).toEqual('sign-in failed');
    }
  });

  it('navigates to /chats if everything went right', async () => {
    const history = createMemoryHistory();

    fetchMock.mockResponseOnce('success');

    {
      const { container, getByTestId } = render(<SignInForm history={history} />);
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
