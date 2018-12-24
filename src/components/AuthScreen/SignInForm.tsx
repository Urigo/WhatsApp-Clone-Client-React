import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { signIn } from '../../services/auth-service'

const name = 'SignInForm'

const Style = styled.div `
`

interface SignInFormProps {
  history: History;
}

export default ({ history }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const onPasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const maySignIn = () => {
    return !!(username && password)
  }

  const handleSignIn = () => {
    signIn({ username, password }).then(() => {
      history.push('/chats')
    })
  }

  const handleSignUp = () => {
    history.push('/sign-up')
  }

  return (
    <Style className={`${name} Screen`}>
      <form>
        <legend>Sign in</legend>
        <div style={{ width: '100%' }}>
          <TextField
            className="AuthScreen-text-field"
            label="Username"
            value={username}
            onChange={onUsernameChange}
            margin="normal"
            placeholder="Enter your username"
          />
          <TextField
            className="AuthScreen-text-field"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            margin="normal"
            placeholder="Enter your password"
          />
        </div>
        <Button type="button" color="secondary" variant="contained" disabled={!maySignIn()} onClick={handleSignIn}>Sign in</Button>
        <span className="AuthScreen-alternative">Don't have an account yet? <a onClick={handleSignUp}>Sign up!</a></span>
      </form>
    </Style>
  )
}
