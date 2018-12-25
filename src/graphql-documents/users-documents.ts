import gql from 'graphql-tag'

export const getMeQuery = gql`
  query GetMe {
    me {
      id,
      name,
      picture,
    }
  }
`

export const getUsersQuery = gql`
  query GetUsers {
    users {
      id,
      name,
      picture,
    }
  }
`
