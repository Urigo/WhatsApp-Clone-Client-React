import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { getAuthHeader } from './services/auth.service';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_APOLLO_SERVER_URI}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_APOLLO_SERVER_URI}`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: getAuthHeader() || null
    }),
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const dataIdFromObject = (object: any) => {
  switch (object.__typename) {
    case 'Message':
      // use `chatId` prefix and `messageId` as the primary key
      return `${object.chat.id}:${object.id}`;
    default:
      // fall back to default handling
      return defaultDataIdFromObject(object);
  }
};

const cache = new InMemoryCache({ dataIdFromObject });

export default new ApolloClient({
  link,
  cache,
});
