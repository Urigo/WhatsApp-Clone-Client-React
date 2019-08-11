import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { cleanup, render, fireEvent, wait } from 'react-testing-library';
import { mockApolloClient } from '../../test-helpers';
import ChatNavbar from './ChatNavbar';
import { RemoveChatDocument } from '../../graphql/types';

describe('ChatNavbar', () => {
  afterEach(cleanup);

  it('renders chat data', () => {
    const client = mockApolloClient();

    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
    };

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <ChatNavbar chat={chat} />
        </ApolloProvider>
      );

      expect(getByTestId('chat-name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('chat-picture')).toHaveAttribute('src', 'https://localhost:4000/picture.jpg');
    }
  })

  it('goes back on arrow click', async () => {
    const client = mockApolloClient();

    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
    };

    const history = createMemoryHistory();

    history.push('/chats/1');

    await wait(() =>
      expect(history.location.pathname).toEqual('/chats/1')
    )

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <ChatNavbar chat={chat} history={history} />
        </ApolloProvider>
      );

      fireEvent.click(getByTestId('back-button'));

      await wait(() =>
        expect(history.location.pathname).toEqual('/chats')
      );
    }
  });

  it('goes back on chat removal', async () => {
    const client = mockApolloClient([
      {
        request: {
          query: RemoveChatDocument,
          variables: { chatId: '1' },
        },
        result: {
          data: {
            removeChat: '1'
          }
        }
      },
    ]);

    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
    };

    const history = createMemoryHistory();

    history.push('/chats/1');

    await wait(() =>
      expect(history.location.pathname).toEqual('/chats/1')
    );

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <ChatNavbar chat={chat} history={history} />
        </ApolloProvider>
      );

      fireEvent.click(getByTestId('delete-button'));

      await wait(() =>
        expect(history.location.pathname).toEqual('/chats')
      );
    }
  })
});