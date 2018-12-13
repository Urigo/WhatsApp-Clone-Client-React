import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GET_ME } from '../graphql-documents/users-documents'
import { GetMe } from '../types'

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(GET_ME, options)
}
