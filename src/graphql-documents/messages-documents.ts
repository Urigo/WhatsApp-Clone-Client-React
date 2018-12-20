import gql from 'graphql-tag'
import * as fragments from './fragments'

export const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`

export const messageAddedSubscription = gql`
  subscription messageAdded($chatId: ID) {
    messageAdded(chatId: $chatId) {
      ...Message
      chat {
        id,
      },
    }
  }
  ${fragments.message}
`

export const moreMessagesQuery = gql`
  query MoreMessages($chatId: ID!, $amount: Int!, $before: String!) {
    chat(chatId: $chatId) {
      messageFeed(amount: $amount, before: $before) {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }
  ${fragments.message}
`

export const removeAllMessagesMutation = gql`
  mutation RemoveAllMessages($chatId: ID!, $all: Boolean) {
    removeMessages(chatId: $chatId, all: $all)
  }
`

export const removeMessagesMutation = gql`
  mutation RemoveMessages($chatId: ID!, $messageIds: [ID]) {
    removeMessages(chatId: $chatId, messageIds: $messageIds)
  }
`
