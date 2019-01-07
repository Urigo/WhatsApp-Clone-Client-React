import gql from 'graphql-tag'
import * as fragments from './fragments'

export const chats = gql `
  query Chats {
    chats {
      ...LightChat
    }
  }
  ${fragments.lightChat}
`

export const users = gql `
  query Users {
    users {
      ...User
    }
  }
  ${fragments.user}
`

export const me = gql `
  query Me {
    me {
      ...User
    }
  }
  ${fragments.user}
`
