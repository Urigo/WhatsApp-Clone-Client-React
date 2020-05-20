import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import ChatCreationNavbar from './ChatCreationNavbar';

describe('ChatCreationNavbar', () => {
  afterEach(cleanup);

  it('goes back on arrow click', async () => {
    const history = createMemoryHistory();

    history.push('/new-chat');

    await waitFor(() => expect(history.location.pathname).toEqual('/new-chat'));

    {
      const { container, getByTestId } = render(
        <ChatCreationNavbar history={history} />
      );

      fireEvent.click(getByTestId('back-button'));

      await waitFor(() => expect(history.location.pathname).toEqual('/chats'));
    }
  });
});
