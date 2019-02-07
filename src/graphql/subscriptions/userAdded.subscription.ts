import gql from 'graphql-tag'
import * as fragments from '../fragments'

export default gql `
  subscription UserAdded {
    userAdded {
      ...userFields
    }
  }
  ${fragments.userFields}
`
