import gql from 'graphql-tag'
import chat from './chat.fragment'

export default gql `
  fragment ChatsList on ChatsList {
    items {
      ...Chat
    }
    length
  }
  ${chat}
`
