import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { signUp } from '../../services/auth-service'

const name = 'SignUpForm'

const Style = styled.div `
`

interface SignUpFormProps {
  history: History;
}

export default ({ history }: SignUpFormProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  const updateName = ({ target }) => {
    setName(target.value)
  }

  const updateUsername = ({ target }) => {
    setUsername(target.value)
  }

  const updateOldPassword = ({ target }) => {
    setOldPassword(target.value)
  }

  const updateNewPassword = ({ target }) => {
    setPassword(target.value)
  }

  const maySignUp = () => {
    return !!(name && username && oldPassword && oldPassword === password)
  }

  const handleSignUp = () => {
    signUp({ username, password, name }).then(() => {
      history.push('/sign-in')
    })
  }

  const handleSignIn = () => {
    history.push('/sign-in')
  }

  return (
    <Style className={`${name} Screen`}>
      <form>
        <legend>Sign up</legend>
        <div style={{ float: 'left', width: 'calc(50% - 10px)', paddingRight: '10px' }}>
          <TextField
            className="AuthScreen-text-field"
            label="Name"
            value={name}
            onChange={updateName}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            className="AuthScreen-text-field"
            label="Username"
            value={username}
            onChange={updateUsername}
            autoComplete="off"
            margin="normal"
          />
        </div>
        <div style={{ float: 'right', width: 'calc(50% - 10px)', paddingLeft: '10px' }}>
          <TextField
            className="AuthScreen-text-field"
            label="Old password"
            type="password"
            value={oldPassword}
            onChange={updateOldPassword}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            className="AuthScreen-text-field"
            label="New password"
            type="password"
            value={password}
            onChange={updateNewPassword}
            autoComplete="off"
            margin="normal"
          />
        </div>
        <Button type="button" color="secondary" variant="contained" disabled={!maySignUp()} onClick={handleSignUp}>Sign up</Button>
        <span className="AuthScreen-alternative">Already have an accout? <a onClick={handleSignIn}>Sign in!</a></span>
      </form>
    </Style>
  )
}
