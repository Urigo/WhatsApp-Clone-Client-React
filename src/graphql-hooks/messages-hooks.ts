import { useEffect } from 'react'
import { useQuery, useMutation, MutationUpdaterFn } from 'react-apollo-hooks'
import { time as uniqid } from 'uniqid'
import store from '../apollo-client'
import { getChatsQuery, getChatQuery } from '../graphql-documents/chats-documents'
import { addMessageMutation, messageAddedSubscription } from '../graphql-documents/messages-documents'
import { getMeQuery } from '../graphql-documents/users-documents'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { AddMessage, GetChat, GetChats } from '../types'

export const useAddMessage = (options: {
  variables: AddMessage.Variables,
  [key: string]: any,
}) => {
  const { data: { messageAdded } } = useSubscription(messageAddedSubscription)
  const { data: { me } } = useQuery(getMeQuery)
  const { chatId, content } = options.variables

  useEffect(() => {
    if (!messageAdded) return

    {
      const { chat }: GetChat.Query = store.readQuery({
        query: getChatQuery,
        variables: { chatId },
      })

      chat.messages.push(messageAdded)

      store.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: { chat },
      })
    }

    {
      const { chats }: GetChats.Query = store.readQuery({
        query: getChatsQuery,
      })

      const chat = chats.find(chat => chat.id === chatId)

      if (chat) {
        chat.messages.push(messageAdded)

        store.writeQuery({
          query: getChatsQuery,
          data: { chats },
        })
      }
    }
  }, [messageAdded])

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
    ...options,
  })
}
