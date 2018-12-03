import gql from 'graphql-tag';
import {fragments} from './fragment';

// We use the gql tag to parse our query string into a query document
export const addGroupMutation = gql`
  mutation AddGroup($recipientIds: [ID!]!, $groupName: String!) {
    addGroup(recipientIds: $recipientIds, groupName: $groupName) {
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
