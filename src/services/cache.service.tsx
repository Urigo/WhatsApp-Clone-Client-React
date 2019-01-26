import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import * as fragments from '../graphql/fragments'
import * as subscriptions from '../graphql/subscriptions'
import * as queries from '../graphql/queries'
import { ChatUpdated, MessageAdded, Message, Chats, FullChat } from '../graphql/types'
import { useSubscription } from '../polyfills/react-apollo-hooks'

export const useSubscriptions = () => {
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
}
