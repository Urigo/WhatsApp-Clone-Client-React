import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const name = 'SignInForm'

const Style = styled.div `
`

interface SignInFormProps {
  history: History;
}

export default ({ history }: SignInFormProps) => {
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

  const maySignIn = () => {
    return !!(username && password)
  }

  const signIn = () => {
    alert('singing in')
  }

  const signUp = () => {
    history.push('/sign-up')
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
          {usernameError && <div className="error">{usernameError}</div>}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={updatePassword}
            margin="normal"
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <Button type="submit" color="secondary" variant="contained" disabled={!maySignIn()} onClick={signIn}>Sign in</Button>
        <span className="alternative">Don't have an account yet? <a onClick={signUp}>Sign up!</a></span>
      </form>
    </Style>
  )
}
