import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Popover from '@material-ui/core/Popover'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
import MoreIcon from '@material-ui/icons/MoreVert'
import gql from 'graphql-tag'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as fragments from '../../fragments'
import { ChatNavbarMutation, ChatNavbarQuery } from '../../types'

const name = 'ChatNavbar'

const Style = styled.div `
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-left: -20px;

  .${name}-title {
    line-height: 56px;
  }

  .${name}-back-button {
    color: var(--primary-text);
  }

  .${name}-picture {
    height: 40px;
    width: 40px;
    margin-top: 3px;
    margin-left: -22px;
    object-fit: cover;
    padding: 5px;
    border-radius: 50%;
  }

  .${name}-rest {
    flex: 1;
    justify-content: flex-end;
  }

  .${name}-options-btn {
    float: right;
    height: 100%;
    font-size: 1.2em;
    margin-right: -15px;
    color: var(--primary-text);
  }

  .${name}-options-item svg {
    margin-right: 10px;
    padding-left: 15px;
  }
`

const query = gql `
  query ChatNavbarQuery($chatId: ID!) {
    chat(chatId: $chatId) {
      ...Chat
      messages {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

const mutation = gql `
  mutation ChatNavbarMutation($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`

interface ChatNavbarProps {
  chatId: string;
  history: History;
}

export default ({ chatId, history }: ChatNavbarProps) => {
  const { data: { chat } } = useQuery<ChatNavbarQuery.Query, ChatNavbarQuery.Variables>(query, {
    variables: { chatId }
  })
  const removeChat = useMutation<ChatNavbarMutation.Mutation, ChatNavbarMutation.Variables>(mutation, {
    variables: { chatId }
  })
  const [popped, setPopped] = useState(false)

  const navToChats = () => {
    history.push('/chats')
  }

  const navToGroupDetails = () => {
    setPopped(false)
    history.push(`/chats/${chatId}/details`, { chat })
  }

  const handleRemoveChat = () => {
    setPopped(false)
    removeChat().then(navToChats)
  }

  return (
    <Style className={name}>
      <Button className={`${name}-back-button`} onClick={navToChats}>
        <ArrowBackIcon />
      </Button>
      <img className={`${name}-picture`} src={chat.picture || (chat.isGroup ? '/assets/default-group-pic.jpg' : '/assets/default-profile-pic.jpg')} />
      <div className={`${name}-title`}>{chat.name}</div>
      <div className={`${name}-rest`}>
        <Button className={`${name}-options-btn`} onClick={setPopped.bind(null, true)}>
          <MoreIcon />
        </Button>
      </div>
      <Popover
        open={popped}
        onClose={setPopped.bind(null, false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Style style={{ marginLeft: '-15px' }}>
          <List>
            {chat.isGroup && (
              <ListItem className={`${name}-options-item`} button onClick={navToGroupDetails}><InfoIcon />Details</ListItem>
            )}
            <ListItem className={`${name}-options-item`} button onClick={handleRemoveChat}><DeleteIcon />Delete</ListItem>
          </List>
        </Style>
      </Popover>
    </Style>
  )
}
