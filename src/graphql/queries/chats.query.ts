import gql from 'graphql-tag';

export default gql`
  query Chats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;
