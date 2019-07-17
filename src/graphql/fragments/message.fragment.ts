import gql from 'graphql-tag';

export default gql`
  fragment Message on Message {
    id
    createdAt
    content
    chat {
      id
    }
  }
`;
