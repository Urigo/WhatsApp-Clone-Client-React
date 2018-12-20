import gql from 'graphql-tag'

export const getUsersQuery = gql`
  query GetUsers {
    users {
      id,
      name,
      picture,
    }
  }
`
