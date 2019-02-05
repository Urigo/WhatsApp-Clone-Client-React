import * as React from 'react'
import { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import * as queries from '../graphql/queries'
import { GetUser, User } from '../graphql/types'
import { useSubscriptions } from './cache.service'

export const AUTH_HEADER = 'accounts-access-token';
export const AUTH_STORE_KEY = 'accounts:accessToken';

const MyContext = React.createContext<User.Fragment>(null)

export const useMe = () => {
  return useContext(MyContext)
}

export const withAuth = (Component: React.ComponentType) => {
  return props => {
    if (!getAuthHeader()) return <Redirect to="/sign-in" />

    // Validating against server
    const myResult = useQuery<GetUser.Query>(queries.getUser)

    // Override TypeScript definition issue with the current version
    if (myResult.error) return <Redirect to="/sign-in" />

    useSubscriptions()

    return (
      <MyContext.Provider value={myResult.data.getUser}>
        <Component {...props} />
      </MyContext.Provider>
    )
  }
}

export const getAuthHeader = (): string | null => {
  return localStorage.getItem(AUTH_STORE_KEY) || null
}

export default {
  useMe,
  withAuth,
  getAuthHeader,
}
