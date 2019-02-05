import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { OperationDefinitionNode } from 'graphql'
import { getAuthHeader, AUTH_HEADER } from './services/auth.service'
import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import { createUploadLink } from 'apollo-upload-client';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql'
const wsUri = httpUri.replace(/^https?/, 'ws')

const httpLink = createUploadLink({ uri: httpUri });

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: () => ({
      [AUTH_HEADER]: getAuthHeader(),
    }),
  },
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      [AUTH_HEADER]: getAuthHeader(),
    },
  }
})

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

export const accountsGraphQL = new GraphQLClient({ graphQLClient: apolloClient });
export const accountsClient = new AccountsClient({}, accountsGraphQL);
export const accountsPassword = new AccountsClientPassword(accountsClient, { hashPassword: password => password});
