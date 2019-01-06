import TextField from '@material-ui/core/TextField'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState } from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import * as fragments from '../../fragments'
import { useGetChat, useGetMe, useChangeChatInfo } from '../../graphql-hooks'
import { pickPicture, uploadProfilePicture } from '../../services/picture-service'
import { GroupDetailsScreenQuery, GroupDetailsScreenMutation, User } from '../../types'
import Navbar from '../Navbar'
import CompleteGroupButton from './CompleteGroupButton'
import GroupDetailsNavbar from './GroupDetailsNavbar'

const name = 'GroupDetailsScreen'

const Style = styled.div `
  .${name}-group-name {
    width: calc(100% - 30px);
    margin: 15px;
  }

  .${name}-participants-title {
    margin-top: 10px;
    margin-left: 15px;
  }

  .${name}-participants-list {
    display: flex;
    overflow: overlay;
    padding: 0;
  }

  .${name}-participant-item {
    padding: 10px;
    flex-flow: row wrap;
    text-align: center;
  }

  .${name}-participant-picture {
    flex: 0 1 50px;
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .${name}-group-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .${name}-participant-name {
    line-height: 10px;
    font-size: 14px;
  }

  .${name}-group-picture {
    width: 50px;
    flex-basis: 50px;
    border-radius: 50%;
    margin-left: 15px;
    object-fit: cover;
    cursor: pointer;
  }
`

const query = gql `
  query GroupDetailsScreenQuery($withMe: Boolean!, $withChat: Boolean!, $chatId: ID) {
    me @include(if: $withMe) {
      ...User
    }
    chat(chatId: $chatId) @include(if: $withChat) {
      ...Chat
    }
  }
  ${fragments.chat}
  ${fragments.user}
`

const mutation = gql `
  mutation GroupDetailsScreenMutation($chatId: ID!, $name: String, $picture: String) {
    changeChatInfo(chatId: $chatId, name: $name, picture: $picture) {
      ...Chat
    }
  }
  ${fragments.chat}
`

const subscription = gql `
  subscription GroupDetailsScreenSubscription($chatId: ID!) {
    chatInfoChanged(chatId: $chatId) {
      id
      name
      picture
    }
  }
`

export default ({ location, match, history }: RouteComponentProps) => {
  const chatId = match.params.chatId || ''

  let myId: string
  let chatName: string
  let chatPicture: string
  let ownerId: string
  let users: User.Fragment[]
  let participants: User.Fragment[]
  let changeChatInfo: (localOptions?: MutationHookOptions<ChangeChatInfo.Mutation, ChangeChatInfo.Variables>) => any;

  const { data: { me } } = useQuery<GroupDetailsScreenQuery.Query, GroupDetailsScreenQuery.Variables>(query, {
    variables: { withMe: true }
  })

  if (chatId) {
    const chat = useQuery<GroupDetailsScreenQuery.Query, GroupDetailsScreenQuery.Variables>(query, {
      variables: { withChat: true, chatId }
    }).data.chat
    changeChatInfo = useMutation<GroupDetailsScreenMutation.Mutation, GroupDetailsScreenMutation.Variables>(mutation)
    myId = me.id
    chatName = chat.name
    chatPicture = chat.picture
    ownerId = chat.owner.id
    users = chat.allTimeMembers
    participants = users.slice()
  }
  else {
    changeChatInfo = () => {}
    myId = ''
    chatName = ''
    chatPicture = ''
    ownerId = ''
    users = location.state.users
    participants = [me].concat(users)
  }

  // Users are missing from state
  if (!(users instanceof Array)) {
    return (
      <Redirect to="/chats" />
    )
  }

  // Put me first
  {
    const index = participants.findIndex(participant => participant.id === me.id)
    participants.splice(index, 1)
    participants.unshift(me)
  }

  const [groupName, setGroupName] = useState(chatName)
  const [groupPicture, setGroupPicture] = useState(chatPicture)

  const onGroupNameChange = ({ target }) => {
    setGroupName(target.value)
  }

  const updateChatName = () => {
    changeChatInfo({
      variables: {
        chatId,
        name: groupName,
      }
    })
  }

  const updateChatPicture = async () => {
    const file = await pickPicture()

    if (!file) return

    const { url } = await uploadProfilePicture(file)

    setGroupPicture(url)

    changeChatInfo({
      variables: {
        chatId,
        picture: url,
      }
    })
  }

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <GroupDetailsNavbar chatId={chatId} history={history} />
      </Navbar>
      <div className={`${name}-group-info`}>
        <img
          className={`${name}-group-picture`}
          src={groupPicture || '/assets/default-group-pic.jpg'}
          onClick={updateChatPicture}
        />
        <TextField
          label="Group name"
          placeholder="Enter group name"
          className={`${name}-group-name`}
          value={groupName}
          onChange={onGroupNameChange}
          onBlur={updateChatName}
          disabled={ownerId !== myId}
          autoFocus={true}
        />
      </div>
      <div className={`${name}-participants-title`}>Participants: {participants.length}</div>
      <ul className={`${name}-participants-list`}>
        {participants.map(participant => (
          <div key={participant.id} className={`${name}-participant-item`}>
            <img src={participant.picture || '/assets/default-profile-pic.jpg'} className={`${name}-participant-picture`} />
            <span className={`${name}-participant-name`}>{participant.name}</span>
          </div>
        ))}
      </ul>
      {!chatId && groupName && <CompleteGroupButton history={history} groupName={groupName} users={users} />}
    </Style>
  )
}
