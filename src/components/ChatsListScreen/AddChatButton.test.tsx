import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, wait } from 'react-testing-library';
import AddChatButton from './AddChatButton';

describe('AddChatButton', () => {
  afterEach(cleanup);

  it('goes back on arrow click', async () => {
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(<AddChatButton history={history} />);

      fireEvent.click(getByTestId('new-chat-button'));

      await wait(() =>
        expect(history.location.pathname).toEqual('/new-chat')
      );
    }
  });
});
