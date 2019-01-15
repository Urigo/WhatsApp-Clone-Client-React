import gql from 'graphql-tag'

export default gql `
  fragment Chat on Chat {
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