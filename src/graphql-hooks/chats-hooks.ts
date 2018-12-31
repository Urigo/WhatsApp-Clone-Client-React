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

    if (!chats) return
    if (chats.some(chat => chat.id === chatAdded.id)) return

    chats.push(chatAdded)

    store.writeQuery({
      query: getChatsQuery,
      data: { chats },
    })
  }, [chatAdded && chatAdded.id])
}

const useChatRemoved = () => {
  const { data: { chatRemoved } } = useSubscription<ChatRemoved.Subscription>(chatRemovedSubscription)

  useEffect(() => {
    if (!chatRemoved) return

    let chats
    try {
      chats = store.readQuery<GetChats.Query>({
        query: getChatsQuery
      }).chats
    }
    catch (e) {

    }

    if (!chats) return

    const index = chats.findIndex(chat => chat.id === chatRemoved)

    if (index === -1) return

    chats.splice(index, 1)

    store.writeQuery({
      query: getChatsQuery,
      data: { chats },
    })
  }, [chatRemoved])
}

export const useGetChats = (options?) => {
  const { data: { chatAdded } } = useSubscription<ChatAdded.Subscription>(chatAddedSubscription)
  const { data: { chatInfoChanged } } = useSubscription<ChatInfoChanged.Subscription>(chatInfoChangedSubscription)

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

  useEffect(() => {
    if (!chatInfoChanged) return

    {
      let chat
      try {
        chat = store.readQuery<GetChat.Query>({
          query: getChatQuery,
          variables: { chatId: chatInfoChanged.id },
        }).chat
      }
      catch (e) {
        return
      }

      if (chat) {
        chat.name = chatInfoChanged.name
        chat.picture = chatInfoChanged.picture

        store.writeQuery({
          query: getChatQuery,
          variables: { chatId: chatInfoChanged.id },
          data: { chat },
        })
      }
    }

    {
      let chats
      try {
        chats = store.readQuery<GetChats.Query>({
          query: getChatsQuery,
        }).chats
      }
      catch (e) {
        return
      }

      const chat = chats.find(chat => chat.id === chatInfoChanged.id)

      if (chat) {
        chat.name = chatInfoChanged.name
        chat.picture = chatInfoChanged.picture

        store.writeQuery({
          query: getChatsQuery,
          data: { chats },
        })
      }
    }
  }, [chatInfoChanged && chatInfoChanged.id])

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
