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

export const changeUserInfoMutation = gql `
  mutation ChangeUserInfo($name: String, $picture: String) {
    changeUserInfo(name: $name, picture: $picture)
  }
`
