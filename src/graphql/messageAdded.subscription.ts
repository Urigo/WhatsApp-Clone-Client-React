import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const messageAddedSubscription = gql`
  subscription messageAdded($chatId: ID) {
    messageAdded(chatId: $chatId) {
      ...Message
      chat {
        id,
      },
    }
  }

  ${fragments['message']}
`;
