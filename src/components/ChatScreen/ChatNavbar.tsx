import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InfoIcon from '@material-ui/icons/Info'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'
import { GetChat } from '../../types'

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
    object-fit: contain;
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
`

interface ChatNavbarProps {
  useGetChat: () => { data: GetChat.Query };
  history: History;
}

export default ({ useGetChat, history }: ChatNavbarProps) => {
  const { data: { chat } } = useGetChat()

  const navToChats = () => {
    history.push('/chats')
  }

  const navToGroupDetails = () => {
    history.push(`/chats/${chat.id}/details`, { chat })
  }

  return (
    <Style className={name}>
      <Button className={`${name}-back-button`} onClick={navToChats}>
        <ArrowBackIcon />
      </Button>
      <img className={`${name}-picture`} src={chat.picture || (chat.isGroup ? '/assets/default-group-pic.jpg' : '/assets/default-profile-pic.jpg')} />
      <div className={`${name}-title`}>{chat.name}</div>
      {chat.isGroup && (
        <div className={`${name}-rest`}>
          <Button className={`${name}-options-btn`} onClick={navToGroupDetails}>
            <InfoIcon />
          </Button>
        </div>
      )}
    </Style>
  )
}
