import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }

  ${fragments['message']}
`;
