import gql from 'graphql-tag'
import * as fragments from '../fragments'

export default gql `
  subscription ChatAdded {
    chatAdded {
      ...LightChat
    }
  }
  ${fragments.lightChat}
`
