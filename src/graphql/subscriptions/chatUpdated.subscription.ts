import gql from 'graphql-tag'
import * as fragments from '../fragments'

export default gql `
  subscription ChatUpdated {
    chatUpdated {
      ...Chat
    }
  }
  ${fragments.chat}
`
