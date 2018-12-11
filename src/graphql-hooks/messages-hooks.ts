import gql from 'graphql-tag'
// import { useQuery } from 'react-apollo-hooks'
// import { GetMessages } from '../types'

// export const useGetMessages = (options?) => {
//   return useQuery<GetMessages.Query, GetMessages.Variables>(gql `
//     query GetMessages($chatId: ID!, $skip: Int, $limit: Int) {
//       chat(chatId: $chatId) {
//         messages(skip: $skip, limit: $limit) {
//           _id
//           contents
//           sentAt
//           from {
//             name
//           }
//           isMine
//         }
//       }
//     }
//   `, options)
// }

export const query = gql `
  query GetMessages($chatId: ID!, $skip: Int, $limit: Int) {
    chat(chatId: $chatId) {
      messages(skip: $skip, limit: $limit) {
        _id
        contents
        sentAt
        from {
          name
        }
        isMine
      }
    }
  }
`

export const useGetMessages = () => ({
  data: {
    chat: {
      messages: [
        {
          _id: 0,
          contents: 'hello',
          sentAt: new Date(),
          from: { name: 'Rachel' },
          isMine: true,
        },
        {
          _id: 1,
          contents: 'world',
          sentAt: new Date(),
          from: { name: 'Ross' },
          isMine: false,
        },
      ]
    }
  }
})
