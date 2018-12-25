import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GetMe, GetUsers, ChangeUserInfo } from '../types'
import {
  getMeQuery,
  getUsersQuery,
  changeUserInfoMutation,
} from '../graphql-documents'

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(getMeQuery, options)
}

export const useGetUsers = (options?) => {
  return useQuery<GetUsers.Query, GetUsers.Variables>(getUsersQuery, options)
}

export const useChangeUserInfo = (options?) => {
  return useMutation<ChangeUserInfo.Mutation, ChangeUserInfo.Variables>(changeUserInfoMutation, options)
}
