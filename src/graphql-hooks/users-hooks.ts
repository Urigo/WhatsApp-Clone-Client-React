import gql from 'graphql-tag'
import { useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { time as uniqid } from 'uniqid'
import store from '../apollo-client'
import { useSubscription } from '../polyfills/react-apollo-hooks'
import { GetMe, GetUsers, ChangeUserInfo, UserInfoChanged } from '../types'
import {
  getMeQuery,
  getUsersQuery,
  changeUserInfoMutation,
  userInfoChangedSubscription,
} from '../graphql-documents'

export const useGetMe = (options?) => {
  return useQuery<GetMe.Query, GetMe.Variables>(getMeQuery, options)
}

export const useGetUsers = (options?) => {
  const { data: { userInfoChanged } } = useSubscription<UserInfoChanged.Subscription>(userInfoChangedSubscription)

  useEffect(() => {
    if (!userInfoChanged) return

    let users
    try {
      users = store.readQuery<GetUsers.Query>({
        query: getUsersQuery
      }).users
    }
    catch (e) {
      return
    }

    const targetUser = users.find(candiUser => candiUser.id === userInfoChanged.id)

    if (targetUser) {
      targetUser.picture = userInfoChanged.picture
      targetUser.name = userInfoChanged.name

      store.writeQuery({
        query: getUsersQuery,
        data: users,
      })
    }
  }, [userInfoChanged && userInfoChanged.id])

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
