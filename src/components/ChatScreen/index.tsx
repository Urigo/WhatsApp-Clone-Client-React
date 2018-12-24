import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { useGetChat } from '../../graphql-hooks'
import Navbar from '../Navbar'
import ChatNavbar from './ChatNavbar'
import MessageBox from './MessageBox'
import MessagesList from './MessagesList'

const name = 'ChatScreen'

const Style = styled.div `
  .${name}-body {
    position: relative;
    background: url(/assets/chat-background.jpg);
    width: 100%;
    height: calc(100% - 56px);

    .MessagesList {
      position: absolute;
      height: calc(100% - 60px);
      top: 0;
    }

    .MessageBox {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .AddChatButton {
      right: 0;
      bottom: 0;
    }
  }
`

export default ({ match, history }: RouteComponentProps) => {
  const { data: { chat } } = useGetChat({
    variables: { chatId: match.params.chatId }
  })

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <Suspense fallback={null}>
          <ChatNavbar chat={chat} history={history} />
        </Suspense>
      </Navbar>
      <div className={`${name}-body`}>
        <Suspense fallback={null}>
          <MessagesList messages={chat.messages} />
        </Suspense>
        <MessageBox chatId={match.params.chatId} />
      </div>
    </Style>
  )
}
