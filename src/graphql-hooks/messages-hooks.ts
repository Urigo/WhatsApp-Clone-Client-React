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

export const useAddMessage = (options: {
  variables: AddMessage.Variables,
  [key: string]: any,
}) => {
  const { chatId, content } = options.variables
  const { data: { messageAdded } } = useSubscription<MessageAdded.Subscription, MessageAdded.Variables>(messageAddedSubscription, {
    variables: { chatId }
  })
  const { data: { me } } = useQuery<GetMe.Query, GetMe.Variables>(getMeQuery)

  const updateGetChat = (message) => {
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

  const updateGetChats = (message) => {
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

  const updateStore = (message) => {
    updateGetChat(message)
    updateGetChats(message)
  }

  useEffect(() => {
    if (!messageAdded) return

    updateStore(messageAdded)
  }, [messageAdded && messageAdded.id])

  return useMutation<AddMessage.Mutation, AddMessage.Variables>(addMessageMutation, {
    variables: {
      chatId,
      content,
    },
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
      updateStore(addMessage)
    },
    ...options,
  })
}
