import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { cleanup, render, waitForDomChange } from '@testing-library/react';
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
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/dick.jpg'
      );
    }
  });
});
