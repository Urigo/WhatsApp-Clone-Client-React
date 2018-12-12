import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetMessages } from '../types'

export const useGetMessages = (options?) => {
  return useQuery<GetMessages.Query, GetMessages.Variables>(gql `
    query GetMessages($chatId: ID!) {
      chat(chatId: $chatId) {
        _id
        messages {
          _id
          sentAt
          contents
          isMine
          from {
            name
          }
        }
      }
    }
  `, options)
}
