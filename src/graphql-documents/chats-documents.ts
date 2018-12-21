import gql from 'graphql-tag'
import * as fragments from './fragments'

export const addChatMutation = gql `
  mutation AddChat($recipientId: ID!) {
    addChat(recipientId: $recipientId) {
      ...ChatWithoutMessages
      messageFeed {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

// export const addGroupMutation = gql`
//   mutation AddGroup($recipientIds: [ID!]!, $groupName: String!) {
//     addGroup(recipientIds: $recipientIds, groupName: $groupName) {
//       ...ChatWithoutMessages
//       messageFeed {
//         hasNextPage,
//         cursor,
//         messages {
//           ...Message
//         }
//       }
//     }
//   }
//   ${fragments.chatWithoutMessages}
//   ${fragments.message}
// `

export const chatAddedSubscription = gql`
  subscription chatAdded($amount: Int!) {
    chatAdded {
      ...ChatWithoutMessages
      messageFeed(amount: $amount) {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

export const getChatQuery = gql`
  query GetChat($chatId: ID!, $amount: Int!) {
    chat(chatId: $chatId) {
      ...ChatWithoutMessages
      messageFeed(amount: $amount) {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

export const getChatsQuery = gql`
  query GetChats($amount: Int!) {
    chats {
      ...ChatWithoutMessages
      messageFeed(amount: $amount) {
        hasNextPage,
        cursor,
        messages {
          ...Message
        }
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

export const removeChatMutation = gql`
  mutation RemoveChat($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`
