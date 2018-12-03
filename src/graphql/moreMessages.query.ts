import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const moreMessagesQuery = gql`
  query MoreMessages($chatId: ID!, $amount: Int!, $before: String!) {
    chat(chatId: $chatId) {
      messageFeed(amount: $amount, before: $before) {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }

  ${fragments['message']}
`;
