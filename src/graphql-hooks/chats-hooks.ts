import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GET_CHAT_INFO, GET_CHATS } from '../graphql-documents/chats-documents'
import { GetChats, GetChatInfo } from '../types'

export const useGetChatInfo = (options?) => {
  return useQuery<GetChatInfo.Query, GetChatInfo.Variables>(GET_CHAT_INFO, options)
}

export const useGetChats = (options?) => {
  return useQuery<GetChats.Query, GetChats.Variables>(GET_CHATS, options)
}
