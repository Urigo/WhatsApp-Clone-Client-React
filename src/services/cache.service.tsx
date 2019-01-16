import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import * as fragments from '../graphql/fragments'
import * as subscriptions from '../graphql/subscriptions'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import {
  Chat,
  ChatsList,
  LightChat,
  FullChat,
  User,
  UsersList,
  MessageAdded,
  ChatAdded,
  ChatUpdated,
  UserAdded,
  UserUpdated,
} from '../graphql/types'

export const dataIdFromObject = (object: any) => {
  if (/List$/.test(object.__typename)) {
    return object.__typename
  }

  return defaultDataIdFromObject(object)
}

export const useSubscriptions = () => {
  useSubscription<ChatAdded.Subscription>(subscriptions.chatAdded, {
    onSubscriptionData: ({ client, subscriptionData: { chatAdded } }) => {
      client.writeFragment({
        id: dataIdFromObject(chatAdded),
        fragment: fragments.chat,
        data: chatAdded,
      })

      client.writeFragment({
        id: dataIdFromObject(chatAdded),
        fragment: fragments.lightChat,
        fragmentName: 'LightChat',
        data: chatAdded,
      })

      let chatsList
      try {
        chatsList = client.readFragment<ChatsList.Fragment>({
          id: 'ChatsList',
          fragment: fragments.chatsList,
          fragmentName: 'ChatsList',
        })
      } catch (e) {}

      if (
        chatsList &&
        !chatsList.items.some(chat => chat.id === chatAdded.id)
      ) {
        chatsList.items.push(chatAdded)
        chatsList.length = chatsList.items.length

        client.writeFragment({
          id: 'ChatsList',
          fragment: fragments.chatsList,
          fragmentName: 'ChatsList',
          data: chatsList,
        })
      }
    },
  })

  useSubscription<ChatUpdated.Subscription>(subscriptions.chatUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { chatUpdated } }) => {
      client.writeFragment({
        id: dataIdFromObject(chatUpdated),
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
          id: dataIdFromObject(messageAdded.chat),
          fragment: fragments.fullChat,
          fragmentName: 'FullChat',
        })
      } catch (e) {}

      if (fullChat && !fullChat.messages.some(message => message.id === messageAdded.id)) {
        fullChat.messages.push(messageAdded)

        client.writeFragment({
          id: dataIdFromObject(fullChat),
          fragment: fragments.fullChat,
          fragmentName: 'FullChat',
          data: fullChat,
        })
      }

      let lightChat
      try {
        lightChat = client.readFragment<LightChat.Fragment>({
          id: dataIdFromObject(messageAdded.chat),
          fragment: fragments.lightChat,
          fragmentName: 'LightChat',
        })
      } catch (e) {}

      if (lightChat) {
        lightChat.messages = [messageAdded]

        client.writeFragment({
          id: dataIdFromObject(lightChat),
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
        id: dataIdFromObject(userAdded),
        fragment: fragments.user,
        data: userAdded,
      })

      let usersList
      try {
        usersList = client.readFragment<UsersList.Fragment>({
          id: 'UsersList',
          fragment: fragments.usersList,
          fragmentName: 'UsersList',
        })
      }
      catch (e) {}

      if (
        usersList &&
        !usersList.some(user => user.id === userAdded.id)
      ) {
        usersList.items.push(userAdded)
        usersList.length = usersList.items.length

        client.writeFragment({
          id: 'UsersList',
          fragment: fragments.usersList,
          fragmentName: 'UsersList',
          data: usersList,
        })
      }
    },
  })

  useSubscription<UserUpdated.Subscription>(subscriptions.userUpdated, {
    onSubscriptionData: ({ client, subscriptionData: { userUpdated } }) => {
      client.writeFragment({
        id: dataIdFromObject(userUpdated),
        fragment: fragments.user,
        data: userUpdated,
      })
    },
  })
}
