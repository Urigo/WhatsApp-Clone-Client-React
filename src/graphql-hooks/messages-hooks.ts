import gql from 'graphql-tag'
import { useQuery } from 'react-hooks'
import { GetMessages } from '../types'

export interface GetMessagesOptions {
  variables: GetMessages.Variables,
  [key: string],
}

export const useGetMessages = (options: GetMessagesOptions): GetMessages.Query => {
  return useQuery(gql `
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
