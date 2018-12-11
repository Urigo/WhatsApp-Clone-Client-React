import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetChats } from '../types'

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
