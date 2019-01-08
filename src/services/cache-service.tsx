import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
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
        id: defaultDataIdFromObject(chatAdded),
        fragment: fragments.chat,
        data: chatAdded,
      })

      client.writeFragment({
        id: defaultDataIdFromObject(chatAdded),
        fragment: fragments.lightChat,
        fragmentName: 'LightChat',
        data: chatAdded,
      })

      let chats
      try {
        chats = client.readQuery<Chats.Query>({
          query: queries.chats,
        }).chats
      } catch (e) {}

      if (chats && !chats.some(chat => chat.id === chatAdded.id)) {
        chats.push(chatAdded)

        client.writeQuery({
          query: queries.chats,
          data: { chats },
        })
      }
    },
  })

  useSubscription<ChatUpdated.Subscription>(subscriptions.chatUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { chatUpdated } }) => {
      client.writeFragment({
        id: defaultDataIdFromObject(chatUpdated),
        fragment: fragments.chat,
        data: chatUpdated,
      })
    },
  })

  useSubscription<MessageAdded.Subscription>(subscriptions.messageAdded, {
    onSubscriptionData: ({ client, subscriptionData: { messageAdded } }) => {
      let fullChat
      try {
        fullChat = client.readFragment<FullChat.Fragment>({
          id: defaultDataIdFromObject(messageAdded.chat),
          fragment: fragments.fullChat,
          fragmentName: 'FullChat',
        })
      } catch (e) {}

      if (fullChat && !fullChat.messages.some(message => message.id === messageAdded.id)) {
        fullChat.messages.push(messageAdded)

        client.writeFragment({
          id: defaultDataIdFromObject(fullChat),
          fragment: fragments.fullChat,
          fragmentName: 'FullChat',
          data: fullChat,
        })
      }

      let lightChat
      try {
        lightChat = client.readFragment<LightChat.Fragment>({
          id: defaultDataIdFromObject(messageAdded.chat),
          fragment: fragments.lightChat,
          fragmentName: 'LightChat',
        })
      } catch (e) {}

      if (lightChat) {
        lightChat.messages = [messageAdded]

        client.writeFragment({
          id: defaultDataIdFromObject(lightChat),
          fragment: fragments.lightChat,
          fragmentName: 'LightChat',
          data: lightChat,
        })
      }
    },
  })

  useSubscription<UserAdded.Subscription>(subscriptions.userAdded, {
    onSubscriptionData: ({ client, subscriptionData: { userAdded } }) => {
      client.writeFragment({
        id: defaultDataIdFromObject(userAdded),
        fragment: fragments.user,
        data: userAdded,
      })

      let users
      try {
        users = client.readQuery<Users.Query>({
          query: queries.users,
        }).users
      } catch (e) {}

      if (users && !users.some(user => user.id === userAdded.id)) {
        users.push(userAdded)

        client.writeQuery({
          query: queries.users,
          data: { users },
        })
      }
    },
  })

  useSubscription<UserUpdated.Subscription>(subscriptions.userUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { userUpdated } }) => {
      client.writeFragment({
        id: defaultDataIdFromObject(userUpdated),
        fragment: fragments.user,
        data: userUpdated,
      })
    },
  })
}
