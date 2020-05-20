import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { cleanup, render, fireEvent, wait, waitForDomChange } from 'react-testing-library';
import { mockApolloClient } from '../test-helpers';
import UsersList, { UsersListQuery } from './UsersList';
import * as queries from '../graphql/queries';

describe('UsersList', () => {
  afterEach(cleanup);

  it('renders fetched users data', async () => {
    const client = mockApolloClient([
      {
        request: { query: UsersListQuery },
        result: {
          data: {
            users: [
              {
                __typename: 'User',
                id: 1,
                name: 'Charles Dickhead',
                picture: 'https://localhost:4000/dick.jpg',
              },
            ],
          },
        },
      },
    ]);

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <UsersList />
        </ApolloProvider>
      );

      await waitForDomChange({ container });

      expect(getByTestId('name')).toHaveTextContent('Charles Dickhead');
      expect(getByTestId('picture')).toHaveAttribute('src', 'https://localhost:4000/dick.jpg');
    }
  })

  it('triggers onUserPick() callback on user-item click', async () => {
    const client = mockApolloClient([
      {
        request: { query: UsersListQuery },
        result: {
          data: {
            users: [
              {
                __typename: 'User',
                id: 1,
                name: 'Charles Dickhead',
                picture: 'https://localhost:4000/dick.jpg',
              },
            ],
          },
        },
      },
    ]);

    const onUserPick = jest.fn(() => {});

    {
      const { container, getByTestId } = render(
        <ApolloProvider client={client}>
          <UsersList onUserPick={onUserPick} />
        </ApolloProvider>
      );

      await waitForDomChange({ container });

      fireEvent.click(getByTestId('user'));

      await wait(() =>
        expect(onUserPick.mock.calls.length).toBe(1)
      );

      expect(onUserPick.mock.calls[0][0].name).toEqual('Charles Dickhead');
      expect(onUserPick.mock.calls[0][0].picture).toEqual('https://localhost:4000/dick.jpg');
    }
  });
});
