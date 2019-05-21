import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import ChatNavbar from './ChatNavbar';

describe('ChatNavbar', () => {
  afterEach(cleanup);

  it('renders chat data', () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
        {
          id: '1',
          content: 'foo',
          createdAt: time,
        },
        {
          id: '2',
          content: 'bar',
          createdAt: time,
        },
      ],
    };

    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(
        <ChatNavbar chat={chat} history={history} />
      );

      expect(getByTestId('chat-name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('chat-picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
    }
  });

  it('goes back on arrow click', async () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
        {
          id: '1',
          content: 'foo',
          createdAt: time,
        },
        {
          id: '2',
          content: 'bar',
          createdAt: time,
        },
      ],
    };

    const history = createMemoryHistory();

    history.push('/chats/1');

    await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));

    {
      const { container, getByTestId } = render(
        <ChatNavbar chat={chat} history={history} />
      );

      fireEvent.click(getByTestId('back-button'));

      await waitFor(() => expect(history.location.pathname).toEqual('/chats'));
    }
  });
});
