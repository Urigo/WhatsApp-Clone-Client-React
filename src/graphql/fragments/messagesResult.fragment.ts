import gql from 'graphql-tag';
import message from './message.fragment';

export default gql`
  fragment MessagesResult on MessagesResult {
    cursor
    hasMore
    messages {
      ...Message
    }
  }
  ${message}
`;
