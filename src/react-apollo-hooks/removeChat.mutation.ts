import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
export const removeChatMutation = gql`
  mutation RemoveChat($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`;
