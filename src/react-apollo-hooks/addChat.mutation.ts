import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const addChatMutation = gql`
  mutation AddChat($recipientId: ID!) {
    addChat(recipientId: $recipientId) {
      ...ChatWithoutMessages
      messageFeed {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }

  ${fragments['chatWithoutMessages']}
  ${fragments['message']}
`;
