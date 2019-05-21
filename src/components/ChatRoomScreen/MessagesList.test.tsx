import { createMemoryHistory } from 'history';
import React from 'react';
import { cleanup, render, fireEvent, wait, getByTestId } from 'react-testing-library';
import MessagesList from './MessagesList';

describe('MessagesList', () => {
  afterEach(cleanup);

  it('renders messages data', () => {
    const messages = [
      {
        id: '1',
        content: 'foo',
        createdAt: new Date('14 Jun 2017 00:00:00 PDT').toUTCString(),
      },
      {
        id: '2',
        content: 'bar',
        createdAt: new Date('17 Jun 2017 00:01:00 PDT').toUTCString(),
      },
    ];

    let message1, message2;
    {
      const { container, getAllByTestId, getByTestId } = render(<MessagesList messages={messages} />);
      const match = getAllByTestId('message-item');
      message1 = match[0];
      message2 = match[1];
    }

    expect(getByTestId(message1, 'message-content')).toHaveTextContent('foo');
    expect(getByTestId(message1, 'message-date')).toHaveTextContent('10:00');

    expect(getByTestId(message2, 'message-content')).toHaveTextContent('bar');
    expect(getByTestId(message2, 'message-date')).toHaveTextContent('10:01');
  });
});