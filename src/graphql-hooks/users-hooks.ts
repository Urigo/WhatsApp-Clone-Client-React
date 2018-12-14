import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GET_ME, GET_USERS } from '../graphql-documents/users-documents'
import { GetMe, GetUsers } from '../types'

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(GET_ME, options)
}

export const useGetUsers = (options?) => {
  return useQuery<GetUsers.Query, GetUsers.Variables>(GET_USERS, options)
}
