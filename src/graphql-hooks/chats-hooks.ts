import gql from 'graphql-tag'
import { useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import store from '../apollo-client'
import { getChatsQuery, addChatMutation, chatAddedSubscription, addGroupMutation } from '../graphql-documents/chats-documents'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { GetChats, AddChat, ChatAdded, AddGroup } from '../types'

export const useGetChats = (options?) => {
  const { data: { chatAdded } } = useSubscription<ChatAdded.Subscription>(chatAddedSubscription)

  useEffect(() => {
    if (!chatAdded) return

    const { chats }: GetChats.Query = store.readQuery({
      query: getChatsQuery
    })

    const chatExists = chats.some(chat => chat.id !== chatAdded.id)

    if (!chatExists) {
      chats.push(chatAdded)
    }

    store.writeQuery({
      query: getChatsQuery,
      data: { chats },
    })
  }, [chatAdded])

  return useQuery<GetChats.Query, GetChats.Variables>(getChatsQuery, options)
}

export const useAddChat = (options?) => {
  return useMutation<AddChat.Mutation, AddChat.Variables>(addChatMutation, options)
}

export const useAddGroup = (options?) => {
  return useMutation<AddGroup.Mutation, AddGroup.Variables>(addGroupMutation, options)
}
