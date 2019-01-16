import gql from 'graphql-tag'
import lightChat from './lightChat.fragment'

export default gql `
  fragment ChatsList on ChatsList {
    items {
      ...LightChat
    }
    length
  }
  ${lightChat}
`
