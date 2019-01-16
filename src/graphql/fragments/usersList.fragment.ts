import gql from 'graphql-tag'
import user from './user.fragment'

export default gql `
  fragment UsersList on UsersList {
    items {
      ...User
    }
    length
  }
  ${user}
`
