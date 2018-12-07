import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
export const removeAllMessagesMutation = gql`
  mutation RemoveAllMessages($chatId: ID!, $all: Boolean) {
    removeMessages(chatId: $chatId, all: $all)
  }
`;
