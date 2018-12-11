import gql from 'graphql-tag'
import { useQuery } from 'react-hooks'
import { GetChats } from '../types'

export interface GetChatsOptions {
  variables: GetChats.Variables,
  [key: string],
}

export const useGetChats = (options: GetChatsOptions): GetChats.Query => {
  return useQuery(gql `
    query GetChats {
      chats {
        _id
        name
        picture
        recentMessage {
          contents
        }
      }
    }
  `, options)
}
