import * as moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import { useGetMessages } from '../../graphql-hooks/messages-hooks'

const name = 'MessagesList'

const Style = styled.div `
  display: block;
  height: 100%;
  width: calc(100% - 40px);
  overflow-y: overlay;
  padding: 0 20px;

  .${name}-message {
    display: inline-block;
    position: relative;
    max-width: 100%;
    border-radius: 7px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
    margin-top: 20px;
    clear: both;

    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .${name}-message-mine {
    float: right;
    background-color: #DCF8C6;

    &::before {
      right: -11px;
      background-image: url(/assets/message-mine.png);
    }
  }

  .${name}-message-others {
    float: left;
    background-color: #FFF;

    &::before {
      left: -11px;
      background-image: url(/assets/message-other.png);
    }
  }

  .${name}-message-others::before, .${name}-message-mine::before {
    content: "";
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .${name}-message-contents {
    padding: 5px 7px;
    word-wrap: break-word;

    &::after {
      content: " \00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0";
      display: inline;
    }
  }

  .${name}-message-timestamp {
    position: absolute;
    bottom: 2px;
    right: 7px;
    color: gray;
    font-size: 12px;
  }
`

interface MessagesListProps {
  chatId: string;
}

export default ({ chatId }: MessagesListProps) => {
  const r = useGetMessages({
    variables: { chatId }
  })
  const { messages } = r.data.chat

  return (
    <Style className={name}>
      {messages.map((message) => (
        <div key={message._id} className={`${name}-message ${message.isMine ? `${name}-message-mine` : `${name}-message-others`}`}>
          <div className={`${name}-message-contents`}>{message.contents}</div>
          <span className={`${name}-message-timestamp`}>{moment(message.sentAt).format('HH:mm')}</span>
        </div>
      ))}
    </Style>
  )
}
