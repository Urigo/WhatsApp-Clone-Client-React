import gql from 'graphql-tag'

export default gql`
  fragment Message on Message {
    id
    chat {
      id
    }
    sender {
      id
      name
    }
    content
    createdAt
    recipients {
      user {
        id
      }
      message {
        id
        chat {
          id
        }
      }
      chat {
        id
      }
      receivedAt
      readAt
    }
    ownership
  }
`
