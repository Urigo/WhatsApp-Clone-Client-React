import gql from 'graphql-tag'
import * as fragments from '../fragments'

export const getMeQuery = gql`
  query GetMe {
    me {
      ...User
    }
  }
  ${fragments.user}
`

export const getUsersQuery = gql`
  query GetUsers {
    users {
      ...User
    }
  }
  ${fragments.user}
`

export const changeUserInfoMutation = gql `
  mutation ChangeUserInfo($name: String, $picture: String) {
    changeUserInfo(name: $name, picture: $picture) {
      ...User
    }
  }
  ${fragments.user}
`

export const userInfoChangedSubscription = gql `
  subscription UserInfoChanged {
    userInfoChanged {
      ...User
    }
  }
  ${fragments.user}
`
