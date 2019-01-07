import gql from 'graphql-tag'
import * as fragments from './fragments'

export const messageAdded = gql `
  subscription MessageAdded {
    messageAdded {
      ...Message
    }
  }
  ${fragments.message}
`

export const chatAdded = gql `
  subscription ChatAdded {
    chatAdded {
      ...LightChat
    }
  }
  ${fragments.lightChat}
`

export const chatUpdated = gql `
  subscription ChatUpdated {
    chatUpdated {
      ...LightChat
    }
  }
  ${fragments.lightChat}
`

export const userAdded = gql `
  subscription UserAdded {
    userAdded {
      ...User
    }
  }
  ${fragments.user}
`

export const userUpdated = gql `
  subscription UserUpdated {
    userUpdated {
      ...User
    }
  }
  ${fragments.user}
`
