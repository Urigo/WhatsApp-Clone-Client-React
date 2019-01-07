import * as fragments from '../graphql/fragments'
import * as queries from '../graphql/queries'
import * as subscriptions from '../graphql/subscriptions'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import {
  Chats,
  Users,
  Chat,
  LightChat,
  FullChat,
  User,
  MessageAdded,
  ChatAdded,
  ChatUpdated,
  UserAdded,
  UserUpdated,
} from '../graphql/types'

export const useSubscriptions = () => {
  useSubscription<ChatAdded.Subscription>(subscriptions.chatAdded, {
    onSubscriptionData: ({ client, subscriptionData: { chatAdded } }) => {
      client.writeFragment({
        id: chatAdded.id,
        fragment: fragments.chat,
        data: chatAdded,
      })

      client.writeFragment({
        id: chatAdded.id,
        fragment: fragments.lightChat,
        data: chatAdded,
      })

      let chats
      try {
        chats = client.readQuery<Chats.Query>({
          query: queries.chats
        }).chats
      }
      catch (e) {

      }

      if (
        chats &&
        !chats.some(chat => chat.id === chatAdded.id)
      ) {
        chats.push(chatAdded)

        client.writeQuery({
          query: queries.chats,
          data: { chats },
        })
      }
    }
  })

  useSubscription<ChatUpdated.Subscription>(subscriptions.chatUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { chatUpdated } }) => {
      client.writeFragment({
        id: chatUpdated.id,
        fragment: fragments.chat,
        data: chatUpdated,
      })
    }
  })

  useSubscription<MessageAdded.Subscription>(subscriptions.messageAdded, {
    onSubscriptionData: ({ client, subscriptionData: { messageAdded } }) => {
      let fullChat
      try {
        fullChat = client.readFragment<FullChat.Fragment>({
          id: messageAdded.chat.id,
          fragment: fragments.fullChat,
        })
      }
      catch (e) {

      }

      if (
        fullChat &&
        !fullChat.messages.some(message => message.id === messageAdded.id)
      ) {
        fullChat.messages.push(messageAdded)

        client.writeFragment({
          id: fullChat.id,
          fragment: fragments.fullChat,
          data: fullChat,
        })
      }

      let lightChat
      try {
        lightChat = client.readFragment<LightChat.Fragment>({
          id: messageAdded.chat.id,
          fragment: fragments.lightChat,
        })
      }
      catch (e) {

      }

      if (lightChat) {
        lightChat.messages = [messageAdded]

        client.writeFragment({
          id: lightChat.id,
          fragment: fragments.lightChat,
          data: lightChat,
        })
      }
    }
  })

  useSubscription<UserAdded.Subscription>(subscriptions.userAdded, {
    onSubscriptionData: ({ client, subscriptionData: { userAdded } }) => {
      client.writeFragment({
        id: userAdded.id,
        fragment: fragments.user,
        data: userAdded,
      })

      let users
      try {
        users = client.readQuery<Users.Query>({
          query: queries.users
        })
      }
      catch (e) {

      }

      if (
        users &&
        !users.some(user => user.id === userAdded.id)
      ) {
        users.push(userAdded)

        client.writeQuery({
          query: queries.users,
          data: { users },
        })
      }
    }
  })

  useSubscription<UserUpdated.Subscription>(subscriptions.userUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { userUpdated } }) => {
      client.writeFragment({
        id: userUpdated.id,
        fragment: fragments.user,
        data: userUpdated,
      })
    }
  })
}
