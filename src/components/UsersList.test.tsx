import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { cleanup, render, waitFor, screen } from '@testing-library/react';
import { mockApolloClient } from '../test-helpers';
import UsersList, { UsersListQuery } from './UsersList';

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

      await waitFor(() => screen.getByTestId('name'));

      expect(getByTestId('name')).toHaveTextContent('Charles Dickhead');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/dick.jpg'
      );
    }
  });
});
