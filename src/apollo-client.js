import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_APOLLO_SERVER_URI}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_APOLLO_SERVER_URI}`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: loginService.getAuthHeader() || null
    }),
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  subscriptionLink,
  httpLink.create({uri})
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
