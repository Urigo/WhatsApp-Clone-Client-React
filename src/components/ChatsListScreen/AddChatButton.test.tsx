import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import AddChatButton from './AddChatButton';
import { mockApolloClient } from '../../test-helpers';
import { ApolloProvider } from 'react-apollo-hooks';

describe('AddChatButton', () => {
  afterEach(cleanup);

  it('goes back on arrow click', async () => {
    const client = mockApolloClient([]);
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ApolloProvider client={client}>
          <AddChatButton history={history} />
        </ApolloProvider>
      );

      fireEvent.click(getByTestId('new-chat-button'));

      await wait(() => expect(history.location.pathname).toEqual('/new-chat'));
    }
  });
});
