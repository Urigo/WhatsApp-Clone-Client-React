import gql from 'graphql-tag'
import * as fragments from './fragments'

export const addChatMutation = gql `
  mutation AddChat($recipientId: ID!) {
    addChat(recipientId: $recipientId) {
      ...ChatWithoutMessages
      messages {
        ...Message
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
//       messages {
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
  subscription chatAdded {
    chatAdded {
      ...ChatWithoutMessages
      messages {
        ...Message
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

export const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...ChatWithoutMessages
      messages {
        ...Message
      }
    }
  }
  ${fragments.chatWithoutMessages}
  ${fragments.message}
`

export const getChatsQuery = gql`
  query GetChats {
    chats {
      ...ChatWithoutMessages
      messages {
        ...Message
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
