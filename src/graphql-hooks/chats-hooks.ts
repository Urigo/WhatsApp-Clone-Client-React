import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetChats, GetChatInfo } from '../types'

export const useGetChatInfo = (options?) => {
  return useQuery<GetChatInfo.Query, GetChatInfo.Variables>(gql `
    query GetChatInfo($chatId: ID!) {
      chat(chatId: $chatId) {
        _id
        name
        picture
      }
    }
  `, options)
}

export const useGetChats = (options?) => {
  return useQuery<GetChats.Query, GetChats.Variables>(gql `
    query GetChats {
      chats {
        _id
        name
        picture
        recentMessage {
          contents
          sentAt
        }
      }
    }
  `, options)
}
