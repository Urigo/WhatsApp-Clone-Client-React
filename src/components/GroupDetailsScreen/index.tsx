import TextField from '@material-ui/core/TextField'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import * as fragments from '../../graphql/fragments'
import { GroupDetailsScreenQuery, GroupDetailsScreenMutation, User } from '../../graphql/types'
import { useMe } from '../../services/auth.service'
import { pickPicture, uploadProfilePicture } from '../../services/picture.service'
import Navbar from '../Navbar'
import CompleteGroupButton from './CompleteGroupButton'
import GroupDetailsNavbar from './GroupDetailsNavbar'

const Style = styled.div`
  .GroupDetailsScreen-group-name {
    width: calc(100% - 30px);
    margin: 15px;
  }

  .GroupDetailsScreen-participants-title {
    margin-top: 10px;
    margin-left: 15px;
  }

  .GroupDetailsScreen-participants-list {
    display: flex;
    overflow: overlay;
    padding: 0;
  }

  .GroupDetailsScreen-participant-item {
    padding: 10px;
    flex-flow: row wrap;
    text-align: center;
  }

  .GroupDetailsScreen-participant-picture {
    flex: 0 1 50px;
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .GroupDetailsScreen-group-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .GroupDetailsScreen-participant-name {
    line-height: 10px;
    font-size: 14px;
  }

  .GroupDetailsScreen-group-picture {
    width: 50px;
    flex-basis: 50px;
    border-radius: 50%;
    margin-left: 15px;
    object-fit: cover;
    cursor: pointer;
  }
`

const query = gql`
  query GroupDetailsScreenQuery($chatId: ID!) {
    chat(chatId: $chatId) {
      ...Chat
    }
  }
  ${fragments.chat}
`

const mutation = gql`
  mutation GroupDetailsScreenMutation($chatId: ID!, $name: String, $picture: String) {
    updateChat(chatId: $chatId, name: $name, picture: $picture) {
      ...Chat
    }
  }
  ${fragments.chat}
`

export default ({ location, history }: RouteComponentProps) => {
  const users = location.state.users

  // Users are missing from state
  if (!(users instanceof Array)) {
    return <Redirect to="/chats" />
  }

  const me = useMe()
  const [chatName, setChatName] = useState('')
  const [chatPicture, setChatPicture] = useState('')
  const participants = [me].concat(users)

  const updateChatName = ({ target }) => {
    setChatName(target.value)
  }

  const updateChatPicture = async () => {
    const file = await pickPicture()

    if (!file) return

    const { url } = await uploadProfilePicture(file)

    setChatPicture(url)
  }

  return (
    <Style className="GroupDetailsScreen Screen">
      <Navbar>
        <GroupDetailsNavbar history={history} />
      </Navbar>
      <div className="GroupDetailsScreen-group-info">
        <img
          className="GroupDetailsScreen-group-picture"
          src={chatPicture || '/assets/default-group-pic.jpg'}
          onClick={updateChatPicture}
        />
        <TextField
          label="Group name"
          placeholder="Enter group name"
          className="GroupDetailsScreen-group-name"
          value={chatName}
          onChange={updateChatName}
          autoFocus={true}
        />
      </div>
      <div className="GroupDetailsScreen-participants-title">
        Participants: {participants.length}
      </div>
      <ul className="GroupDetailsScreen-participants-list">
        {participants.map(participant => (
          <div key={participant.id} className="GroupDetailsScreen-participant-item">
            <img
              src={participant.picture || '/assets/default-profile-pic.jpg'}
              className="GroupDetailsScreen-participant-picture"
            />
            <span className="GroupDetailsScreen-participant-name">{participant.name}</span>
          </div>
        ))}
      </ul>
      {chatName && (
        <CompleteGroupButton
          history={history}
          groupName={chatName}
          groupPicture={chatPicture}
          users={users}
        />
      )}
    </Style>
  )
}
