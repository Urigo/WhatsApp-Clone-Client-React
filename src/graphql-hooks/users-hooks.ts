import gql from 'graphql-tag'
import { useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { time as uniqid } from 'uniqid'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { GetMe, GetUsers, ChangeUserInfo, UserInfoChanged } from '../types'
import {
  getMeQuery,
  getUsersQuery,
  changeUserInfoMutation,
  userInfoChangedSubscription,
} from '../graphql-documents'

export const useUserInfoChanged = () => {
  useSubscription<UserInfoChanged.Subscription>(userInfoChangedSubscription, {
    onSubscriptionData: ({ client, subscriptionData: { userInfoChanged } }) => {
      let users
      try {
        users = client.readQuery<GetUsers.Query>({
          query: getUsersQuery
        }).users
      }
      catch (e) {

      }

      const targetUser = users.find(candiUser => candiUser.id === userInfoChanged.id)

      if (!targetUser) return

      targetUser.picture = userInfoChanged.picture
      targetUser.name = userInfoChanged.name

      client.writeQuery({
        query: getUsersQuery,
        data: users,
      })
    }
  })
}

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(getMeQuery, options)
}

export const useGetUsers = (options?) => {
  useUserInfoChanged()

  return useQuery<GetUsers.Query, GetUsers.Variables>(getUsersQuery, options)
}

export const useChangeUserInfo = (options?) => {
  const changeUser = useMutation<ChangeUserInfo.Mutation, ChangeUserInfo.Variables>(changeUserInfoMutation, options)
  const { data: { me } } = useQuery(getMeQuery)

  return (options: {
    variables: {
      name?: string;
      picture?: string;
      [key: string]: any;
    }
  }) => {
    const { name, picture } = options.variables

    return changeUser({
      variables: { name, picture },
      optimisticResponse: {
        __typename: 'Mutation',
        changeUserInfo: {
          __typename: 'User',
          id: uniqid(),
          name: name || me.name,
          picture: picture || me.picture,
        }
      },
      update: (store, { data: { changeUserInfo } }) => {
        me.picture = picture || me.picture
        me.name = name || me.name

        store.writeQuery({
          query: getMeQuery,
          data: { me },
        })
      },
      ...options,
    })
  }
}
