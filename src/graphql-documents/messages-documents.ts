import gql from 'graphql-tag'

export const ADD_MESSAGE = gql `
  mutation AddMessage($chatId: ID!, $contents: String!) {
    addMessage(chatId: $chatId, contents: $contents) {
      _id
      contents
      sentAt
      isMine
      from {
        name
      }
    }
  }
`

export const GET_MESSAGES = gql `
  query GetMessages($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      messages {
        _id
        sentAt
        contents
        isMine
        from {
          name
        }
      }
    }
  }
`
