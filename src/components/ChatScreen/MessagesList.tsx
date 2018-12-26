import * as moment from 'moment'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { GetChat } from '../../types'

const name = 'MessagesList'

const Style = styled.div `
  display: block;
  height: 100%;
  width: calc(100% - 30px);
  overflow-y: overlay;
  padding: 0 15px;

  .${name}-message {
    display: inline-block;
    position: relative;
    max-width: 100%;
    border-radius: 7px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
    margin-top: 10px;
    margin-bottom: 10px;
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
  useGetChat: () => { data: GetChat.Query };
}

export default ({ useGetChat }: MessagesListProps) => {
  const { data: { chat: { messages } } } = useGetChat()
  const selfRef = useRef(null)

  const resetScrollTop = () => {
    if (!selfRef.current) return

    const selfDOMNode = ReactDOM.findDOMNode(selfRef.current) as HTMLElement
    selfDOMNode.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(resetScrollTop, [selfRef.current])
  useEffect(resetScrollTop, [messages.length])

  return (
    <Style className={name} ref={selfRef}>
      {messages && messages.map((message) => (
        <div key={message.id} className={`${name}-message ${message.ownership ? `${name}-message-mine` : `${name}-message-others`}`}>
          <div className={`${name}-message-contents`}>{message.content}</div>
          <span className={`${name}-message-timestamp`}>{moment(message.createdAt).format('HH:mm')}</span>
        </div>
      ))}
    </Style>
  )
}
