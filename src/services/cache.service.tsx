import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import * as fragments from '../graphql/fragments'
import * as subscriptions from '../graphql/subscriptions'
import { ChatUpdated } from '../graphql/types'
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
}
