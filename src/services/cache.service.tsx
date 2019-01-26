import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import * as fragments from '../graphql/fragments'
import * as subscriptions from '../graphql/subscriptions'
import * as queries from '../graphql/queries'
import {
  ChatUpdated,
  MessageAdded,
  Message,
  Chats,
  FullChat,
  User,
  Users,
  UserAdded,
  UserUpdated,
  ChatAdded,
} from '../graphql/types'
import { useSubscription } from '../polyfills/react-apollo-hooks'

export const useSubscriptions = () => {
  useSubscription<ChatAdded.Subscription>(subscriptions.chatAdded, {
    onSubscriptionData: ({ client, subscriptionData: { chatAdded } }) => {
      client.writeFragment({
        id: defaultDataIdFromObject(chatAdded),
        fragment: fragments.chat,
        fragmentName: 'Chat',
        data: chatAdded,
      })

      let chats
      try {
        chats = client.readQuery<Chats.Query>({
          query: queries.chats,
        }).chats
      } catch (e) {}

      if (chats && !chats.some(chat => chat.id === chatAdded.id)) {
        chats.unshift(chatAdded)

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
        fragmentName: 'Chat',
        data: chatUpdated,
      })
    },
  })

  useSubscription<MessageAdded.Subscription>(subscriptions.messageAdded, {
    onSubscriptionData: ({ client, subscriptionData: { messageAdded } }) => {
      client.writeFragment<Message.Fragment>({
        id: defaultDataIdFromObject(messageAdded),
        fragment: fragments.message,
        data: messageAdded,
      })

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
        fullChat.lastMessage = messageAdded

        client.writeFragment({
          id: defaultDataIdFromObject(fullChat),
          fragment: fragments.fullChat,
          fragmentName: 'FullChat',
          data: fullChat,
        })
      }

      let chats
      try {
        chats = client.readQuery<Chats.Query>({
          query: queries.chats,
        }).chats
      } catch (e) {}

      if (chats) {
        const index = chats.findIndex(chat => chat.id === messageAdded.chat.id)
        const chat = chats[index]
        chats.splice(index, 1)
        chats.unshift(chat)

        client.writeQuery({
          query: queries.chats,
          data: { chats },
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
