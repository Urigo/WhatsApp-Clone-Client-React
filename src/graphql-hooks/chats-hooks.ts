import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { getChatsQuery, addChatMutation } from '../graphql-documents/chats-documents'
import { GetChats, AddChat } from '../types'

export const useGetChats = (options?) => {
  return useQuery<GetChats.Query, GetChats.Variables>(getChatsQuery, options)
}

export const useAddChat = (options?) => {
  return useMutation<AddChat.Mutation, AddChat.Variables>(addChatMutation, options)
}
