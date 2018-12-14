import gql from 'graphql-tag'

export const GET_ME = gql `
  query GetMe {
    me {
      _id
      name
      picture
      phone
    }
  }
`

export const GET_USERS = gql `
  query GetUsers {
    users {
      _id
      name
      picture
      phone
    }
  }
`
