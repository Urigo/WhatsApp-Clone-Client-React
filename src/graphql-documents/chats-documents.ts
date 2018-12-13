import gql from 'graphql-tag'

export const GET_CHAT_INFO = gql `
  query GetChatInfo($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      name
      picture
    }
  }
`

export const GET_CHATS = gql `
  query GetChats {
    chats {
      _id
      name
      picture
      recentMessage {
        contents
        sentAt
      }
    }
  }
`
