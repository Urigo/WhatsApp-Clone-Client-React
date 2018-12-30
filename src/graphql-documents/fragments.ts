import gql from 'graphql-tag'
import { DocumentNode } from 'graphql'

export const user = gql `
  fragment User on User {
    id
    name
    picture
  }
`

export const chatWithoutMessages = gql `
  fragment ChatWithoutMessages on Chat {
    id
    name
    picture
    allTimeMembers {
      id
      name
      picture
    }
    owner {
      id
    }
    isGroup
  }
`

export const message = gql`
  fragment Message on Message {
    id
    chat {
      id
    }
    sender {
      id
      name
    }
    content
    createdAt
    type
    recipients {
      user {
        id
      }
      message {
        id
        chat {
          id
        }
      }
      chat {
        id
      }
      receivedAt
      readAt
    }
    ownership
  }
`
