import gql from 'graphql-tag'
import { useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import store from '../apollo-client'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import {
  AddChat,
  AddGroup,
  ChangeChatInfo,
  ChatAdded,
  ChatInfoChanged,
  ChatRemoved,
  GetChat,
  GetChats,
  RemoveChat,
} from '../types'
import {
  addChatMutation,
  addGroupMutation,
  changeChatInfoMutation,
  chatAddedSubscription,
  chatRemovedSubscription,
  chatInfoChangedSubscription,
  getChatQuery,
  getChatsQuery,
  messageAddedSubscription,
  removeChatMutation,
} from '../graphql-documents'

export const useChatAdded = () => {
  useSubscription<ChatAdded.Subscription>(chatAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData: { chatAdded } }) => {
      let chats
      try {
        chats = client.readQuery<GetChats.Query>({
          query: getChatsQuery
        }).chats
      }
      catch (e) {

      }

      if (!chats) return
      if (chats.some(chat => chat.id === chatAdded.id)) return

      chats.push(chatAdded)

      client.writeQuery({
        query: getChatsQuery,
        data: { chats },
      })
    }
  })
}

export const useChatRemoved = () => {
  useSubscription<ChatRemoved.Subscription>(chatRemovedSubscription, {
    onSubscriptionData: ({ client, subscriptionData: { chatRemoved } }) => {
      let chats
      try {
        chats = client.readQuery<GetChats.Query>({
          query: getChatsQuery
        }).chats
      }
      catch (e) {

      }

      if (!chats) return

      const index = chats.findIndex(chat => chat.id === chatRemoved)

      if (index === -1) return

      chats.splice(index, 1)

      client.writeQuery({
        query: getChatsQuery,
        data: { chats },
      })
    }
  })
}

export const useChatInfoChanged = () => {
  useSubscription<ChatInfoChanged.Subscription>(chatInfoChangedSubscription, {
    onSubscriptionData: ({ client, subscriptionData: { chatInfoChanged } }) => {
      let chat
      try {
        chat = store.readQuery<GetChat.Query>({
          query: getChatQuery,
          variables: { chatId: chatInfoChanged.id },
        }).chat
      }
      catch (e) {

      }

      if (!chat) return

      chat.name = chatInfoChanged.name
      chat.picture = chatInfoChanged.picture

      store.writeQuery({
        query: getChatQuery,
        variables: { chatId: chatInfoChanged.id },
        data: { chat },
      })
    }
  })
}

export const useGetChats = (options?) => {
  useChatAdded()
  useChatInfoChanged()

  return useQuery<GetChats.Query, GetChats.Variables>(getChatsQuery, options)
}

export const useChangeChatInfo = (options?) => {
  return useMutation<ChangeChatInfo.Mutation, ChangeChatInfo.Variables>(changeChatInfoMutation, options)
}

export const useGetChat = (options?) => {
  return useQuery<GetChat.Query, GetChat.Variables>(getChatQuery, options)
}

export const useAddChat = (options?) => {
  useChatAdded()

  return useMutation<AddChat.Mutation, AddChat.Variables>(addChatMutation, options)
}

export const useRemoveChat = (options?) => {
  useChatRemoved()

  return useMutation<RemoveChat.Mutation, RemoveChat.Variables>(removeChatMutation, options)
}

export const useAddGroup = (options?) => {
  useChatAdded()

  return useMutation<AddGroup.Mutation, AddGroup.Variables>(addGroupMutation, options)
}
