import * as React from 'react'
import { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import store from '../apollo-client'
import * as queries from '../graphql/queries'
import { Me, User } from '../graphql/types'
import { useSubscriptions } from './cache.service'

const MyContext = React.createContext<User.Fragment>(null)

export const useMe = () => {
  return useContext(MyContext)
}

export const withAuth = (Component: React.ComponentType) => {
  return props => {
    if (!getAuthHeader()) return <Redirect to="/sign-in" />

    // Validating against server
    const myResult = useQuery<Me.Query>(queries.me)

    // Override TypeScript definition issue with the current version
    if (myResult.error) return <Redirect to="/sign-in" />

    useSubscriptions()

    return (
      <MyContext.Provider value={myResult.data.me}>
        <Component {...props} />
      </MyContext.Provider>
    )
  }
}

export const storeAuthHeader = (auth: string) => {
  localStorage.setItem('Authorization', auth)
}

export const getAuthHeader = (): string | null => {
  return localStorage.getItem('Authorization') || null
}

export const signIn = ({ username, password }) => {
  const auth = `Basic ${btoa(`${username}:${password}`)}`

  return fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
    method: 'POST',
    headers: {
      Authorization: auth,
    },
  }).then(res => {
    if (res.status < 400) {
      storeAuthHeader(auth)
    } else {
      return Promise.reject(res.statusText)
    }
  })
}

export const signUp = ({ username, password, name }) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  })
}

export const signOut = () => {
  localStorage.removeItem('Authorization')

  return store.clearStore()
}

export default {
  useMe,
  withAuth,
  storeAuthHeader,
  getAuthHeader,
  signIn,
  signUp,
  signOut,
}
