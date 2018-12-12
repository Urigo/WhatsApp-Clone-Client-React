import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'
import { useGetChatInfo } from '../../graphql-hooks/chats-hooks'
import Navbar from '../Navbar'

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
`

interface ChatNavbarProps {
  chatId: string;
  history: History;
}

export default ({ chatId, history }: ChatNavbarProps) => {
  const { data: { chat } } = useGetChatInfo({
    variables: { chatId }
  })

  const navToChats = () => {
    history.push('/chats')
  }

  return (
    <Style className={name}>
      <Button className={`${name}-back-button`} onClick={navToChats}>
        <ArrowBackIcon />
      </Button>
      <img className={`${name}-picture`} src={chat.picture} />
      <div className={`${name}-title`}>{chat.name}</div>
    </Style>
  )
}
