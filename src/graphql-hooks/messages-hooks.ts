// import gql from 'graphql-tag'
// import { useQuery, useMutation } from 'react-apollo-hooks'
// import { MutationUpdaterFn } from 'react-apollo-hooks'
// import { time as uniqid } from 'uniqid'
// import { GetMessages, GetChats, AddMessage } from '../types'
// import store from '../apollo-client'
// import { GET_CHATS } from '../graphql-documents/chats-documents'
// import { GET_MESSAGES, ADD_MESSAGE } from '../graphql-documents/messages-documents'
// import { GET_ME } from '../graphql-documents/users-documents'

// export const useAddMessage = (options: {
//   variables: AddMessage.Variables,
//   [key: string]: any,
// }) => {
//   const { chatId, contents } = options.variables
//   const { me } = store.readQuery({ query: GET_ME })

//   return useMutation<AddMessage.Mutation, AddMessage.Variables>(ADD_MESSAGE, {
//     variables: {
//       chatId,
//       contents,
//     },
//     optimisticResponse: {
//       __typename: 'Mutation',
//       addMessage: {
//         _id: uniqid(),
//         __typename: 'Message',
//         chat: {
//           _id: chatId,
//           __typename: 'Chat',
//         },
//         from: {
//           __typename: 'User',
//           name: me.name,
//         },
//         contents,
//         sentAt: new Date(),
//         isMine: true,
//       },
//     },
//     update: ((store, { data: { addMessage } }) => {
//       {
//         const { chat }: GetMessages.Query = store.readQuery({
//           query: GET_MESSAGES,
//           variables: { chatId },
//         })

//         chat.messages.push(addMessage)

//         store.writeQuery({
//           query: GET_MESSAGES,
//           variables: { chatId },
//           data: { chat },
//         })
//       }

//       // TODO: See how we can provide
//       {
//         const { chats }: GetChats.Query = store.readQuery({
//           query: GET_CHATS,
//         })

//         const chat = chats.find(chat => chat._id === chatId)

//         if (chat) {
//           chat.recentMessage = addMessage

//           store.writeQuery({
//             query: GET_CHATS,
//             data: { chats },
//           })
//         }
//       }
//     }) as MutationUpdaterFn<AddMessage.Mutation>,
//     ...options,
//   })
// }

// export const useGetMessages = (options?) => {
//   return useQuery<GetMessages.Query, GetMessages.Variables>(GET_MESSAGES, options)
// }
