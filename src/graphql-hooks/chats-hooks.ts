import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetChats, GetChatInfo } from '../types'

export const getChatInfoQuery = gql `
  query GetChatInfo($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      name
      picture
    }
  }
`

export const useGetChatInfo = (options?) => {
  return useQuery<GetChatInfo.Query, GetChatInfo.Variables>(getChatInfoQuery, options)
}

export const getChatsQuery = gql `
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
`

export const useGetChats = (options?) => {
  return useQuery<GetChats.Query, GetChats.Variables>(getChatsQuery, options)
}
