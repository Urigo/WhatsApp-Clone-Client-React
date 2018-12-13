import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const name = 'SignInForm'

const Style = styled.div `
`

interface SignInFormProps {
  handleSignUp: () => void;
}

export default ({ handleSignUp }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const updateUsername = ({ target }) => {
    setUsername(target.value)
  }

  const updatePassword = ({ target }) => {
    setPassword(target.value)
  }

  const signIn = () => {
    alert('singing in')
  }

  const maySignIn = () => {
    return !!(username && password)
  }

  const requestSignUp = () => {
    handleSignUp()
  }

  return (
    <Style className={`${name} Screen`}>
      <form>
        <legend>Sign in</legend>
        <div style={{ width: '100%' }}>
          <TextField
            label="Username"
            value={username}
            onChange={updateUsername}
            margin="normal"
          />
          {usernameError && (
            <div className="error">Username is required</div>
          )}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={updatePassword}
            margin="normal"
          />
          {passwordError && (
            <div className="error">Password is required</div>
          )}
        </div>
        <Button type="submit" color="secondary" variant="contained" disabled={maySignIn()} onClick={signIn}>Sign in</Button>
        <span className="alternative">Don't have an account yet? <a onClick={requestSignUp}>Sign up!</a></span>
      </form>
    </Style>
  )
}
