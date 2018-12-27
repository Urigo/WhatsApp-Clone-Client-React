import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { useState } from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { useGetChat, useGetMe, useChangeChatInfo } from '../../graphql-hooks'
import { pickPicture, uploadProfilePicture } from '../../services/picture-service'
import { GetUsers, ChangeChatInfo } from '../../types'
import Navbar from '../Navbar'
import CompleteGroupButton from './CompleteGroupButton'
import GroupDetailsNavbar from './GroupDetailsNavbar'

const name = 'GroupDetailsScreen'

const Style = styled.div `
  .${name}-group-name {
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

  .${name}-group-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .${name}-user-name {
    line-height: 10px;
    font-size: 14px;
  }

  .${name}-group-picture {
    width: 50px;
    flex-basis: 50px;
    border-radius: 50%;
    margin-left: 15px;
    object-fit: contain;
    cursor: pointer;
  }
`

export default ({ location, match, history }: RouteComponentProps) => {
  const chatId = match.params.chatId || ''

  let myId: string
  let chatName: string
  let chatPicture: string
  let ownerId: string
  let users: GetUsers.Users[]
  let changeChatInfo: (localOptions?: MutationHookOptions<ChangeChatInfo.Mutation, ChangeChatInfo.Variables>) => any;

  if (chatId) {
    const me = useGetMe().data.me
    const chat = useGetChat({ variables: { chatId } }).data.chat
    changeChatInfo = useChangeChatInfo()
    myId = me.id
    chatName = chat.name
    chatPicture = chat.picture
    ownerId = chat.owner.id
    users = chat.allTimeMembers
  }
  else {
    changeChatInfo = () => {}
    myId = ''
    chatName = ''
    chatPicture = ''
    ownerId = ''
    users = location.state.users
  }

  if (!(users instanceof Array)) {
    return (
      <Redirect to="/chats" />
    )
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
      <div className={`${name}-users-title`}>Participants: {users.length}</div>
      <ul className={`${name}-users-list`}>
        {users && users.map(user => (
          <div key={user.id} className={`${name}-user-item`}>
            <img src={user.picture || '/assets/default-profile-pic.jpg'} className={`${name}-user-picture`} />
            <span className={`${name}-user-name`}>{user.name}</span>
          </div>
        ))}
      </ul>
      {!chatId && groupName && <CompleteGroupButton history={history} groupName={groupName} users={users} />}
    </Style>
  )
}
