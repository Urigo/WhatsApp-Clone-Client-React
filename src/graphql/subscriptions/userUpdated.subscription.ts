import gql from 'graphql-tag'
import * as fragments from '../fragments'

export default gql `
  subscription UserUpdated {
    userUpdated {
      ...User
    }
  }
  ${fragments.user}
`
