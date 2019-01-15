import gql from 'graphql-tag'
import chat from './chat.fragment'
import message from './message.fragment'

export default gql `
  fragment LightChat on Chat {
    ...Chat
    messages(amount: 1) {
      ...Message
    }
  }
  ${chat}
  ${message}
`
