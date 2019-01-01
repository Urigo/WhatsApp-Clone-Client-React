import { DataProxy } from 'apollo-cache'
import { useEffect } from 'react'
import { useQuery, useMutation, MutationUpdaterFn } from 'react-apollo-hooks'
import { time as uniqid } from 'uniqid'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { AddMessage, GetChat, GetChats, GetMe, MessageAdded } from '../types'
import {
  getChatsQuery,
  getChatQuery,
  addMessageMutation,
  messageAddedSubscription,
  getMeQuery,
} from '../graphql-documents'

const updateGetChat = (client: DataProxy, message: AddMessage.AddMessage, { chatId }: { chatId: string }) => {
  let chat
  try {
    chat = client.readQuery<GetChat.Query>({
      query: getChatQuery,
      variables: { chatId },
    }).chat
  }
  catch (e) {
    return
  }

  if (chat.messages.some(({ id }) => id === message.id)) return

  chat.messages.push(message)

  client.writeQuery({
    query: getChatQuery,
    variables: { chatId },
    data: { chat },
  })
}

const updateGetChats = (client: DataProxy, message: AddMessage.AddMessage, { chatId }: { chatId: string }) => {
  let chats
  try {
    chats = client.readQuery<GetChats.Query>({
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

  client.writeQuery({
    query: getChatsQuery,
    data: { chats },
  })
}

export const useMessageAdded = (options) => {
  useSubscription<MessageAdded.Subscription, MessageAdded.Variables>(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData: { messageAdded } }) => {
      const chatId = messageAdded.chat.id
      updateGetChat(client, messageAdded, { chatId })
      updateGetChats(client, messageAdded, { chatId })
    },
    ...options,
  })
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
    update: (client, { data: { addMessage } }) => {
      updateGetChat(client, addMessage, options.variables)
      updateGetChats(client, addMessage, options.variables)
    },
    ...options,
  })
}
