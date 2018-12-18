import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { GetUsers } from '../../types'
import Navbar from '../Navbar'
import CompleteGroupButton from './CompleteGroupButton'
import GroupDetailsNavbar from './GroupDetailsNavbar'

const name = 'GroupDetailsScreen'

const Style = styled.div `
  .${name}-name-input {
    width: calc(100% - 30px);
    margin: 15px;
  }

  .${name}-users-title {
    margin-top: 10px;
    margin-left: 15px;
  }

  .${name}-users-list {
    display: flex;
    overflow: overlay;
    padding: 0;
  }

  .${name}-user-item {
    padding: 10px;
    flex-flow: row wrap;
    text-align: center;
  }

  .${name}-user-picture {
    flex: 0 1 50px;
    height: 50px;
    width: 50px;
    object-fit: contain;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .${name}-user-name {
    line-height: 10px;
    font-size: 14px;
  }

  .${name}-filler {
    color: lig
  }
`

export default ({ location, history }: RouteComponentProps) => {
  const users = location.state.users as GetUsers.Users[]
  const [groupName, setGroupName] = useState('')

  const onGroupNameChange = ({ target }) => {
    setGroupName(target.value)
  }

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <GroupDetailsNavbar history={history} />
      </Navbar>
      <TextField
        label="Group name"
        placeholder="Enter group name"
        className={`${name}-name-input`}
        onChange={onGroupNameChange}
        autoFocus={true}
      />
      <div className={`${name}-users-title`}>Participants: {users.length}</div>
      <ul className={`${name}-users-list`}>
        {users.map(user => (
          <div key={user._id} className={`${name}-user-item`}>
            <img src={user.picture || 'assets/default-profile-pic.jpg'} className={`${name}-user-picture`} />
            <span className={`${name}-user-name`}>{user.name}</span>
          </div>
        ))}
      </ul>
      {groupName && <CompleteGroupButton history={history} />}
    </Style>
  )
}
