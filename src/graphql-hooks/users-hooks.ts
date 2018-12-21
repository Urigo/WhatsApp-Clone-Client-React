import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { getMeQuery, getUsersQuery } from '../graphql-documents/users-documents'
import { GetMe, GetUsers } from '../types'

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(getMeQuery, options)
}

export const useGetUsers = (options?) => {
  return useQuery<GetUsers.Query, GetUsers.Variables>(getUsersQuery, options)
}
