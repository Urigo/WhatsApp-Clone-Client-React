import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetChats } from '../types'

export const useGetChats = (options?) => {
  return useQuery<GetChats.Query, GetChats.Variables>(gql `
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
  `, options)
}

export const getChatsQuery = gql `
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

export const getChatQuery = gql `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      name
      picture
      messages {
        contents
        sentAt
        from {
          name
        }
      }
    }
  }
`

// export const useGetChats = () => ({
//   data: {
//     chats: [
//       {
//         _id: 0,
//         picture: '',
//         name: 'Bla Bla',
//         recentMessage: {
//           contents: 'bla bla',
//           sentAt: new Date(),
//         }
//       }
//     ]
//   }
// })

export const useGetChat = () => ({
  data: {
    chats: {
      _id: 0,
      picture: '',
      name: 'Bla Bla',
      messages: [
        {
          _id: 0,
          contents: 'Hello',
          sentAt: new Date(),
          from: { name: 'Rachel' },
        },
        {
          _id: 1,
          contents: 'World',
          sentAt: new Date(),
          from: { name: 'Ross' },
        },
      ],
    }
  }
})
