import gql from 'graphql-tag'

export const user = gql `
  fragment User on User {
    id
    name
    picture
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

export const lightChat = gql `
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
  ${message}
`

export const lightChat = gql `
  fragment LightChat on Chat {
    ...Chat
    messages(amount: 1) {
      ...Message
    }
  }
  ${chat}
  ${message}
`

export const fullChat = gql `
  fragment FullChat on Chat {
    ...Chat
    messages {
      ...Message
    }
  }
  ${chat}
  ${message}
`
