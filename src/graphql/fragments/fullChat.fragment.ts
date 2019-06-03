import gql from 'graphql-tag';
import chat from './chat.fragment';
import messagesResult from './messagesResult.fragment';

export default gql`
  fragment FullChat on Chat {
    ...Chat
    messages(limit: $limit, after: $after) @connection(key: "messages") {
      ...MessagesResult
    }
  }
  ${chat}
  ${messagesResult}
`;
