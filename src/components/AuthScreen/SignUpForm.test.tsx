import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, wait, waitForElement } from 'react-testing-library';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  afterEach(cleanup);
  afterEach(() => fetch.resetMocks());

  it('enables sign-up button when filled in', async () => {
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(<SignUpForm history={history} />);
      const nameInput = getByTestId('name-input').querySelector('input');
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const passwordConfirmInput = getByTestId('password-confirm-input').querySelector('input');
      const signUpButton = getByTestId('sign-up-button') as HTMLButtonElement;

      expect(signUpButton.disabled).toEqual(true);

      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

      await waitForElement(() => nameInput);
      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);
      await waitForElement(() => passwordConfirmInput);

      expect(signUpButton.disabled).toEqual(false);
    }
  });

  it('prints server error if input was wrong', async () => {
    const history = createMemoryHistory();

    fetchMock.mockRejectOnce(new Error('sign-up failed'));

    {
      const { container, getByTestId } = render(<SignUpForm history={history} />);
      const nameInput = getByTestId('name-input').querySelector('input');
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const passwordConfirmInput = getByTestId('password-confirm-input').querySelector('input');
      const signUpButton = getByTestId('sign-up-button') as HTMLButtonElement;
      const errorMessage = getByTestId('error-message');

      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

      await waitForElement(() => nameInput);
      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);
      await waitForElement(() => passwordConfirmInput);

      fireEvent.click(signUpButton);

      await waitForElement(() => errorMessage);

      expect(errorMessage.innerHTML).toEqual('sign-up failed');
    }
  });

  it('navigates to /sign-in if everything went right', async () => {
    const history = createMemoryHistory();

    fetchMock.mockResponseOnce('success');

    {
      const { container, getByTestId } = render(<SignUpForm history={history} />);
      const nameInput = getByTestId('name-input').querySelector('input');
      const usernameInput = getByTestId('username-input').querySelector('input');
      const passwordInput = getByTestId('password-input').querySelector('input');
      const passwordConfirmInput = getByTestId('password-confirm-input').querySelector('input');
      const signUpButton = getByTestId('sign-up-button') as HTMLButtonElement;

      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

      await waitForElement(() => nameInput);
      await waitForElement(() => usernameInput);
      await waitForElement(() => passwordInput);
      await waitForElement(() => passwordConfirmInput);

      fireEvent.click(signUpButton);

      await wait(() =>
        expect(history.location.pathname).toEqual('/sign-in')
      );
    }
  });
});
