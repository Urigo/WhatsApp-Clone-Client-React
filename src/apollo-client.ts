import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import { createUploadLink } from 'apollo-upload-client';
import { accountsLink } from '@accounts/apollo-link';
import userFieldsFragment from './graphql/fragments/user-fields.fragment';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql'
const wsUri = httpUri.replace(/^https?/, 'ws')

const httpLink = createUploadLink({ uri: httpUri });

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const tokens = await accountsClient.getTokens();
      if (tokens) {
        return {
          Authorization: 'Bearer ' + tokens.accessToken,
        };
      } else {
        return { };
      }
    },
  },
});

const authLink = accountsLink(() => accountsClient);

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

const link = ApolloLink.from([terminatingLink])

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link,
  cache,
})

export const accountsGraphQL = new GraphQLClient({ graphQLClient: apolloClient, userFieldsFragment });
export const accountsClient = new AccountsClient({}, accountsGraphQL);
export const accountsPassword = new AccountsClientPassword(accountsClient);
