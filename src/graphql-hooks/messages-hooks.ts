import { useEffect } from 'react'
import { useQuery, useMutation, MutationUpdaterFn } from 'react-apollo-hooks'
import { time as uniqid } from 'uniqid'
import store from '../apollo-client'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { AddMessage, GetChat, GetChats, GetMe, MessageAdded } from '../types'
import {
  getChatsQuery,
  getChatQuery,
  addMessageMutation,
  messageAddedSubscription,
  getMeQuery,
} from '../graphql-documents'

const updateGetChat = (message: AddMessage.AddMessage, { chatId }: { chatId: string }) => {
  let chat
  try {
    chat = store.readQuery<GetChat.Query>({
      query: getChatQuery,
      variables: { chatId },
    }).chat
  }
  catch (e) {
    return
  }

  if (chat.messages.some(({ id }) => id === message.id)) return

  chat.messages.push(message)

  store.writeQuery({
    query: getChatQuery,
    variables: { chatId },
    data: { chat },
  })
}

const updateGetChats = (message: AddMessage.AddMessage, { chatId }: { chatId: string }) => {
  let chats
  try {
    chats = store.readQuery<GetChats.Query>({
      query: getChatsQuery,
    }).chats
  }
  catch (e) {
    return
  }

  const chat = chats.find(chat => chat.id === chatId)

  if (!chat) return
  if (chat.messages.some(({ id }) => id === message.id)) return

  chat.messages.push(message)

  store.writeQuery({
    query: getChatsQuery,
    data: { chats },
  })
}

export const useMessageAdded = (options) => {
  const { data: { messageAdded } } = useSubscription<MessageAdded.Subscription, MessageAdded.Variables>(messageAddedSubscription, options)

  useEffect(() => {
    if (!messageAdded) return

    const chatId = messageAdded.chat.id
    updateGetChat(messageAdded, { chatId })
    updateGetChats(messageAdded, { chatId })
  }, [messageAdded && messageAdded.id])
}

export const useAddMessage = (options: {
  variables: AddMessage.Variables,
  [key: string]: any,
}) => {
  const { data: { me } } = useQuery<GetMe.Query, GetMe.Variables>(getMeQuery)
  const { chatId, content } = options.variables

  return useMutation<AddMessage.Mutation, AddMessage.Variables>(addMessageMutation, {
    variables: options.variables,
    optimisticResponse: {
      __typename: 'Mutation',
      addMessage: {
        id: uniqid(),
        __typename: 'Message',
        chat: {
          id: chatId,
          __typename: 'Chat',
        },
        sender: {
          id: me.id,
          __typename: 'User',
          name: me.name,
        },
        content,
        createdAt: new Date(),
        type: 0,
        recipients: [],
        ownership: true,
      },
    },
    update: (store, { data: { addMessage } }) => {
      updateGetChat(addMessage, options.variables)
      updateGetChats(addMessage, options.variables)
    },
    ...options,
  })
}
