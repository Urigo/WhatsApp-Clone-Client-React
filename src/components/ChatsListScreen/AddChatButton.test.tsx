import { createMemoryHistory } from 'history';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import AddChatButton from './AddChatButton';
import { mockApolloClient } from '../../test-helpers';

describe('AddChatButton', () => {
  afterEach(cleanup);

  it('goes back on arrow click', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient();

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <AddChatButton history={history} />
        </ApolloProvider>
      );

      fireEvent.click(getByTestId('new-chat-button'));

      await wait(() => expect(history.location.pathname).toEqual('/new-chat'));
    }
  });
});
