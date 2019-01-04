import gql from 'graphql-tag'
import * as fragments from '../fragments'

export const addChatMutation = gql `
  mutation AddChat($recipientId: ID!) {
    addChat(recipientId: $recipientId) {
      ...Chat
      messages {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export const addGroupMutation = gql`
  mutation AddGroup($recipientIds: [ID!]!, $groupName: String!) {
    addGroup(recipientIds: $recipientIds, groupName: $groupName) {
      ...Chat
      messages {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export const removeChatMutation = gql`
  mutation RemoveChat($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`

export const changeChatInfoMutation = gql`
  mutation ChangeChatInfo($chatId: ID!, $name: String, $picture: String) {
    changeChatInfo(chatId: $chatId, name: $name, picture: $picture) {
      ...Chat
    }
  }
  ${fragments.chat}
`

export const chatAddedSubscription = gql`
  subscription chatAdded {
    chatAdded {
      ...Chat
      messages(amount: 1) {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export const chatRemovedSubscription = gql`
  subscription chatRemoved {
    chatRemoved
  }
`

export const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...Chat
      messages {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export const getChatsQuery = gql`
  query GetChats {
    chats {
      ...Chat
      messages(amount: 1) {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export const chatInfoChangedSubscription = gql`
  subscription ChatInfoChanged {
    chatInfoChanged {
      id,
      name,
      picture,
    }
  }
`
