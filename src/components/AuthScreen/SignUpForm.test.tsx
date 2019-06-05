import { createMemoryHistory } from 'history';
import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  wait,
  waitForElement
} from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { act } from 'react-dom/test-utils';

describe('SignUpForm', () => {
  afterEach(cleanup);
  afterEach(() => fetch.resetMocks());

  it('enables sign-up button when filled in', async () => {
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(
        <SignUpForm history={history} />
      );
      const nameInput = getByTestId('name-input').querySelector('input');
      const usernameInput = getByTestId('username-input').querySelector(
        'input'
      );
      const passwordInput = getByTestId('password-input').querySelector(
        'input'
      );
      const passwordConfirmInput = getByTestId(
        'password-confirm-input'
      ).querySelector('input');
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

    let getByTestId = null;

    act(() => {
      getByTestId = render(<SignUpForm history={history} />).getByTestId;
    });
    const nameInput = getByTestId('name-input').querySelector('input');
    const usernameInput = getByTestId('username-input').querySelector('input');
    const passwordInput = getByTestId('password-input').querySelector('input');
    const passwordConfirmInput = getByTestId(
      'password-confirm-input'
    ).querySelector('input');
    const signUpButton = getByTestId('sign-up-button') as HTMLButtonElement;

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    await waitForElement(() => nameInput);
    await waitForElement(() => usernameInput);
    await waitForElement(() => passwordInput);
    await waitForElement(() => passwordConfirmInput);

    act(() => {
      fireEvent.click(signUpButton);
    });

    const errorMessage = await waitForElement(() =>
      getByTestId('error-message')
    );

    expect(errorMessage.innerHTML).toContain('sign-up failed');
  });

  it('navigates to /sign-in if everything went right', async () => {
    const history = createMemoryHistory();
    fetchMock.mockResponseOnce(JSON.stringify({
      data: {
        signUp: {
          __typename: 'User',
          id: 1
        }
      }
    }));

    let getByTestId: any = null;

    act(() => {
      const comp = render(<SignUpForm history={history} />);
      getByTestId = comp.getByTestId;
    });
    const signUpButton = await waitForElement(
      () => getByTestId('sign-up-button') as HTMLButtonElement
    );

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

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Name' } });
      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
    });

    act(() => {
      fireEvent.click(signUpButton);
    })

    await wait(() => expect(history.location.pathname).toEqual('/sign-in'));
  });
});
