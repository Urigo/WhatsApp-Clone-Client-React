import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const name = 'SignUpForm'

const Style = styled.div `
`

interface SignUpFormProps {
  history: History;
}

export default ({ history }: SignUpFormProps) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

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
    setNewPassword(target.value)
  }

  const maySignUp = () => {
    return false
  }

  const signUp = () => {
    alert('singing up')
  }

  const signIn = () => {
    history.push('/sign-in')
  }

  return (
    <Style className={`${name} Screen`}>
      <form>
        <legend>Sign up</legend>
        <div style={{ float: 'left', width: 'calc(50% - 10px)', paddingRight: '10px' }}>
          <TextField
            label="Name"
            value={name}
            onChange={updateName}
            margin="normal"
          />
          {nameError && <div className="error">{nameError}</div>}
          <TextField
            label="Username"
            value={username}
            onChange={updateUsername}
            margin="normal"
          />
          {usernameError && <div className="error">{usernameError}</div>}
        </div>
        <div style={{ float: 'right', width: 'calc(50% - 10px)', paddingLeft: '10px' }}>
          <TextField
            label="Old password"
            type="password"
            value={oldPassword}
            onChange={updateOldPassword}
            margin="normal"
          />
          {oldPasswordError && <div className="error">{oldPasswordError}</div>}
          <TextField
            label="New password"
            type="password"
            value={newPassword}
            onChange={updateNewPassword}
            margin="normal"
          />
          {newPasswordError && <div className="error">{newPasswordError}</div>}
        </div>
        <Button type="submit" color="secondary" variant="contained" disabled={!maySignUp()} onClick={signUp}>Sign up</Button>
        <span className="alternative">Already have an accout? <a onClick={signIn}>Sign in!</a></span>
      </form>
    </Style>
  )
}
