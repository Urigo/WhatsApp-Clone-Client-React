import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { GetMe } from '../types'

export const getMeQuery = gql `
  query GetMe {
    me {
      _id
      name
      picture
      phone
    }
  }
`

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(getMeQuery, options)
}
