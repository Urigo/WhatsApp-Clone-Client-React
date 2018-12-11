import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetMessages } from '../types'

export const useGetMessages = (options?) => {
  return useQuery<GetMessages.Query, GetMessages.Variables>(gql `
    query GetMessages($chatId: ID!, $skip: Int, $limit: Int) {
      chat(chatId: $chatId) {
        messages(skip: $skip, limit: $limit) {
          _id
          contents
          sentAt
          from {
            name
          }
          isMine
        }
      }
    }
  `, options)
}
