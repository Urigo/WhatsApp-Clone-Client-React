import * as React from 'react'
import { Redirect } from 'react-router-dom'

export const withAuth = (Component: React.ComponentType) => {
  return (props) => getAuthHeader() ? (
    <Component {...props} />
  ) : (
    <Redirect to="/sign-in" />
  )
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
      'Authorization': auth
    }
  }).then((res) => {
    if (res.status < 400) {
      storeAuthHeader(auth)
    }
    else {
      return Promise.reject(res.statusText)
    }
  })
}

export const signUp = ({ username, password, name }) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
    }
  })
}

export default {
  withAuth,
  storeAuthHeader,
  getAuthHeader,
  signIn,
  signUp,
}
