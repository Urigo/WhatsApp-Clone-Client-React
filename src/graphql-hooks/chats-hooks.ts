import gql from 'graphql-tag'
import { useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import store from '../apollo-client'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { GetChat, GetChats, AddChat, ChatAdded, AddGroup } from '../types'
import {
  getChatQuery,
  getChatsQuery,
  addChatMutation,
  chatAddedSubscription,
  addGroupMutation,
} from '../graphql-documents'

const useChatAdded = () => {
  const { data: { chatAdded } } = useSubscription<ChatAdded.Subscription>(chatAddedSubscription)

  useEffect(() => {
    if (!chatAdded) return

    let chats
    try {
      chats = store.readQuery<GetChats.Query>({
        query: getChatsQuery
      }).chats
    }
    catch (e) {

    }

    if (chats.some(chat => chat.id === chatAdded.id)) return

    chats.push(chatAdded)

    store.writeQuery({
      query: getChatsQuery,
      data: { chats },
    })
  }, [chatAdded && chatAdded.id])
}

export const useGetChats = (options?) => {
  const { data: { chatAdded } } = useSubscription<ChatAdded.Subscription>(chatAddedSubscription)

  useEffect(() => {
    if (!chatAdded) return

    let chats
    try {
      chats = store.readQuery<GetChats.Query>({
        query: getChatsQuery
      }).chats
    }
    catch (e) {

    }

    if (chats.some(chat => chat.id !== chatAdded.id)) return

    chats.push(chatAdded)

    store.writeQuery({
      query: getChatsQuery,
      data: { chats },
    })
  }, [chatAdded && chatAdded.id])

  return useQuery<GetChats.Query, GetChats.Variables>(getChatsQuery, options)
}

export const useGetChat = (options?) => {
  return useQuery<GetChat.Query, GetChat.Variables>(getChatQuery, options)
}

export const useAddChat = (options?) => {
  useChatAdded()

  return useMutation<AddChat.Mutation, AddChat.Variables>(addChatMutation, options)
}

export const useAddGroup = (options?) => {
  useChatAdded()

  return useMutation<AddGroup.Mutation, AddGroup.Variables>(addGroupMutation, options)
}
