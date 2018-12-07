import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const chatAddedSubscription = gql`
  subscription chatAdded($amount: Int!) {
    chatAdded {
      ...ChatWithoutMessages
      messageFeed(amount: $amount) {
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
