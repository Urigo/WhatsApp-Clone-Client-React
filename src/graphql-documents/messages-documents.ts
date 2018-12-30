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
  subscription messageAdded($chatsIds: [ID!]!) {
    messageAdded(chatsIds: $chatsIds) {
      ...Message
      chat {
        id,
      },
    }
  }
  ${fragments.message}
`
